# Starter Project

Instalar dependencias
~~~shell
npm install
~~~

Crear Carpeta logs o con el nombre de su ex
~~~shell
mkdir logs
~~~


Inicializar Prisma
~~~shell
npx prisma init --datasource-provider sqlite
~~~

Mover el archivo schema.prisma.example dentro de la carpeta prisma
y borrar el .example del archivo

Generar Prisma
~~~shell
npm run db:generate
~~~

Crear base de datos
~~~shell
npm run db:migrate
~~~

Iniciar node
~~~shell
npm run dev
~~~