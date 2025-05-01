src/
├── domain/ // Núcleo del negocio (puro, sin dependencias externas)
│ ├── models/ // Entidades, Objetos de Valor, Agregados
│ ├── services/ // Servicios de dominio (lógica de negocio intrínseca)
│ └── ports/ // Interfaces/puertos: contratos que definen los accesos que el dominio requiere
│
├── services/ // Capa de aplicación: casos de uso o lógica que orquesta la interacción entre dominio y adaptadores
│ └── useCases/ // Ejemplo: que utilicen los servicios de dominio junto con data proveniente de adaptadores
│
├── adapters/ // Implementación de las conexiones externas (APIs, sistemas de mensajería, etc.)
│ ├── api/ // Ejemplo: slices y configuraciones de RTK Query para interactuar con la API (ya sea interna o externa)
│ │ ├── rtkApi.js // Configuración global de RTK Query
│ │ ├── userApiSlice.js // Endpoints relacionados con usuarios
│ │ └── productApiSlice.js// Endpoints relacionados con productos
│ │
│ └── repositories/ // Aquí se implementan los puertos definidos en domain/ports para acceder a datos
│ └── externalRepository.js // Implementación concreta que usa, por ejemplo, llamadas a la API
│
└── config/ // (Opcional) Configuraciones generales y de infraestructura

# DIAGRAMA CONCEPTUAL

                   +--------------------------------+
                   |          ADAPTERS              |
                   |                                |
                   |   - API (RTK Query slices)     |
                   |   - Repositories (Implementa   |
                   |     puertos para datos externos)|
                   +---------------▲----------------+
                                   │
                  +----------------┴-----------------+
                  |             DOMAIN             |
                  |   (Núcleo del negocio puro)    |
                  |                                |
                  |  - Models (Entidades, VO)      |
                  |  - Domain Services             |
                  |  - Ports (Interfaces/Contratos)|
                  +----------------▲-----------------+
                                   │
                  +----------------┴-----------------+
                  |          APPLICATION           |
                  |         (Services/Use Cases)     |
                  |  Orquesta la lógica, invoca los  |
                  |  servicios del dominio y usa     |
                  |  adaptadores para acceder a datos|
                  +----------------------------------+

# ENFOQUE CON REDUX

src/
├── domain/ // Núcleo del negocio (modelo y lógica pura)
│ ├── models/ // Entidades, objetos de valor, etc.
│ ├── services/ // Servicios de dominio (lógica de negocio)
│ └── ports/ // Interfaces que definen contratos hacia adaptadores
│
├── application/ // Casos de uso y servicios de orquestación
│ └── services/ // Lógica que coordina el dominio con la infraestructura
│
├── adapters/ // Adaptadores para conectar con el exterior
│ ├── api/ // Ejemplo: RTK Query slices, configuración de API
│ │ ├── rtkApi.js  
│ │ ├── userApiSlice.js  
│ │ └── productApiSlice.js
│ └── repositories/ // Implementaciones concretas para los puertos definidos
│
└── state/ // Manejo de estado de la aplicación (Redux)
├── slices/ // Redux slices (incluyendo RTK Query slices si se integran en Redux)
│ ├── uiSlice.js  
 │ └── otherSlice.js  
 └── store.js // Configuración y creación del store de Redux

                       +-----------------------------+
                       |       ADAPTERS              |
                       |  - API (RTK Query slices)   |
                       |  - Repositories             |
                       +-------------▲---------------+
                                     │
                 +-------------------┴-------------------+
                 |             DOMAIN                  |
                 |  (Modelo y lógica pura de negocio)  |
                 |  - Models, Domain Services, Ports   |
                 +-------------------▲-------------------+
                                     │
                 +-------------------┴-------------------+
                 |         APPLICATION / SERVICES      |
                 |     (Orquestación de casos de uso)    |
                 +-------------------▲-------------------+
                                     │
                       +-------------┴--------------+
                       |         PRESENTACIÓN       |
                       |     (UI / State Management)|
                       |        - Redux Slices      |
                       |        - Store             |
                       +----------------------------+

https://github.com/carlosazaustre/next-hexagonal-starter
