// @ts-nocheck
//import { Pool } from 'pg'

import { Pool } from 'pg'
/*
let pool

if (!pool) {
   pool = new Pool({
      user: process.env.PGSQL_USER,
      password: process.env.PGSQL_PASSWORD,
      host: process.env.PGSQL_HOST,
      port: process.env.PGSQL_PORT,
      database: process.env.PGSQL_DATABASE,
   })
}*/

const pool = new Pool({
   user: process.env.PGSQL_USER,
   password: process.env.PGSQL_PASSWORD,
   host: process.env.PGSQL_HOST,
   port: process.env.PGSQL_PORT,
   database: process.env.PGSQL_DATABASE,
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

export const query = async ({ text, rowMode, values }) => {
   // console.log('@@@ NODE-PG query -->', { text, values })
   const queryConf = rowMode
      ? {
           text,
           rowMode,
           values,
        }
      : { text, values }
   const start = Date.now()
   const res = await pool.query(queryConf)
   const duration = Date.now() - start
   /*
   console.log('@@@ NODE-PG query stats-->', {
      query: text,
      duration,
      rows: res.rowCount,
   })
*/
   //console.log('@@@ NODE-PG duration -->', { duration, rows: res.rowCount })
   ////console.log('@@@ NODE-PG rowCount -->', text)
   return res
}
/***
 *    Este método rastrea posibles fugas de clientes cuando alguna ruta/función que ha verificado
 * a un cliente para ejecutar una transacción no ha finalizado con client.release() = devolución de cliente
 *    Siempre se debe devolver el cliente al grupo si lo verificas con éxito, independientemente
 * de si hubo o no un error con las consultas que ejecutó en el cliente.
 * Si no liberas al cliente, la aplicación los filtrará y eventualmente el pool estará
 * vacío para siempre y todas las solicitudes futuras para verificar un cliente del pool
 * esperarán para siempre.
 */
export const getClient = async () => {
   const client = await pool.connect()
   const query = client.query
   const release = client.release
   // set a timeout of 5 seconds, after which we will log this client's last query
   const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(
         `The last executed query on this client was: ${client.lastQuery}`
      )
   }, 5000)
   // monkey patch the query method to keep track of the last query executed
   client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
   }
   client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
   }
   return client
}

export default pool
