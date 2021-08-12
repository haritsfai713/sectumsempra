<<<<<<< HEAD
./node_modules/mavlink/src/mavlink.js:1:9-22 - Error: Module not found: Error: Can't resolve 'fs' in 'C:\stei itb\Aksantara\gcs_webapp_2021\node_modules\mavlink\src'

./node_modules/xml2js/lib/parser.js:38:17-47 - Error: Module not found: Error: Can't resolve 'timers' in 'C:\stei itb\Aksantara\gcs_webapp_2021\node_modules\xml2js\lib'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configur

https://stackoverflow.com/questions/50313745/angular-6-process-is-not-defined-when-trying-to-serve-application
=======
# GCS WebApp 2021 

GCS WebApp 2021 merupakan sistem yang berbasis web. dan digunakan sebagai mission planner.

## Installaton 
Ada beberapa hal yang harus di instalasikan terlebih dahulu agar dapat menjalankan web.

1. Install Node js and NPM from browser 
[Download Node js](https://nodejs.org/en/).
untuk mengecek versi node dan npm dapat melakukan command.
```bash
node -v
npm -v
```
2. Install module mongoose
```bash
npm install mongoose
```
3. install Angular cli
```bash
npm i @angular/cli
```

## Running Program 
untuk menjalankan program dibutuhkan dua terminal. 1 terminal untuk menjalankan sisi frontend(angular).Terminal lainnya untuk menjalankan backend. 
1. Running Angular 
pastikan direktori berada pada direktori gcs_webapp_2021
```bash
ng serve
```
2. Running Node untuk menghubungkan database
pastikan direktori berada pada direktori Node yang berada di dalam folder backend 
```bash
node server.js
```

## Akun dummy yang bisa dipakai 
email : test@gmail.com
password : 01234567890

atau bisa mencoba register dan login

heroku git:remote -a gcs-webapp-2021-backend


program dibuat oleh :
1. Moch. Faiq Al-Harits
2. Fadillah Azhar D.K.
3. M.Tamiramin H.S.
>>>>>>> b59bb9914d101c9d7df4cb6e045f8c5ca0256bc4
