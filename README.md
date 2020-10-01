# link-shortener-backend

### `npm run start`
Start serving the app

### `npm run serve-dev`
Start serving the app using nodemon (instant reloading after code update)

### `npm run add-migration`
Creates a migration file. Use `--name` key to specify migration name

### `npm run revert`
Roll back the migration changes. Use `--name` key to specify migration name

Use postman or whatever to invoke the endpoints:

- POST /v1/short-link' - create a shorten link
  arguments:
    - origin: string, required - the link to be shortened
    - alias: string - custom alias for link
  returns: shorten: string - shortened verion of origin link
  
 - GET /:shorten - redirects to web-site with address found by shorten alias or 404 if not found
   params: shorten: string, required - alias for link
