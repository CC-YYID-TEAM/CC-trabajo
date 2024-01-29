import { exec } from 'child_process';

// Función para ejecutar el script de shell y capturar la salida
// Función para ejecutar el script de shell y capturar la salida
export function ejecutarScriptShell(url: string) {
    return new Promise<string>((resolve, reject) => {
        exec(`./src/bash/script.sh ${url}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el script: ${error.message}`);
                reject(error);
                return;
            }
            // Si hay salida de stderr y no es la notificación "Cloning into..."
            if (stderr && !stderr.startsWith('Cloning into')) {
                console.error(`Error en el script: ${stderr}`);
                reject(stderr);
                return;
            }
            // stdout contendrá la salida del script
            resolve(stdout);
        });
    });
}