/// <reference types="./.env" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_TLS_REJECT_UNAUTHORIZED: string,

        NEXT_PUBLIC_API_HOSTNAME: string,
        NEXT_PUBLIC_API_PORT: string,

        NEXT_PUBLIC_API_PATH: string,
        NEXT_PUBLIC_API_PATH_USER: string,
        NEXT_PUBLIC_API_PATH_ADDRESS: string
    }
}