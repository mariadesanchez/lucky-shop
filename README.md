# Descripción



## Correr en dev


1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ``docker compose up -d````
5. Correr las migraciones de Primsa ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Correr el proyecto ```npm run dev```
8. Limpiar el localStorage del navegador.



## Generar la Orden y enviarla a BD:

## 1.- checkout/(checkout)/ui/PlaceOrder.tsx llamo al método placeOrder(productsToOrder, address) actions/place-order.ts
## 2.- comienza a generarse la order, si todo sale ok! redirije a  router.replace('/orders/' + resp.order?.id );

## Generar la Tansaction Tx en PayPal:

## 3.- viene de 2.- '/orders/' + resp.order?.id
## 4.- alli estan los componentes PayPalButton y MercadoPagoButton, pasar amount y orderId,los obtengo de la
## Orden recientemente almacenada en DB
## 5.- components/paypal/PaypalButton reciben amount y orderId
##  Hacer await paypalCheckPayment( details.id )
## paypalCheckPayment esta en actions/payments/paypal-check-payments.ts 
##  comienza y genera toda la transaction TX, y si todo sale ok! regresa a /orders/${ orderId }
##  ----------------------- FIN--------------------------  




## Correr en prod# lucky-shop


