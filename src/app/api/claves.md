## Devolución de errores firebase admin (al menos getAuth().createSessionCookie según GTP)

    {
    "error": {
        "code": 403,
        "message": "Your client does not have permission to get URL /v1/projects/your-project:createSessionCookie from this server.",
        "errors": [
        {
            "message": "Your application is authenticating by using local Application Default Credentials.",
            "domain": "usageLimits",
            "reason": "accessNotConfigured",
            "extendedHelp": "https://console.developers.google.com"
        }
        ],
        "status": "PERMISSION_DENIED"
    }
    }

## Plantilla Response

    # Response
    {
        "success": true,
        "status": 200,
        "message": "Operación exitosa",
        "data": {
            "user": {
            "id": 123,
            "name": "Manuel"
            }
        }
    }

    # Error
    {
        "success": false,
        "status": 400,
        "message": "El usuario no tiene permisos para esta acción",
        "error": {
            "code": "ACCESS_DENIED",
            "details": "Debes estar autenticado para acceder a este recurso."
        }
    }

    # Res con estructura flexible para multiples resultados
    {
        "success": true,
        "status": 200,
        "message": "Listado obtenido correctamente",
        "data": {
            "items": [
            { "id": 1, "name": "Artículo 1" },
            { "id": 2, "name": "Artículo 2" }
            ],
            "pagination": {
            "page": 1,
            "totalPages": 10,
            "totalItems": 100
            }
        }
    }
