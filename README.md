# Testbefund Generator

# Getting Started
## Configuration
To allow for flexible configuration with environment variables, we are using a runtime-loaded ``config.js``
to store secrets and configuration. That, unfortunately, means you will have to do some work
before you can start the application.

1. Go to ``src/assets``
2. Copy the ``sample-config.js`` into ``config.js``
3. Fill in necessary data. See ``Authentication with Azure AD`` for more information
on the tenant id and the client id

## Authentication with Azure AD
Testbefund Generator utilizes Azure AD and the [OIDC Auth Code](https://auth0.com/docs/flows/guides/auth-code/add-login-auth-code)
flow to login the user. 

Upon loading the page, the user will be redirected to the Microsoft login page. After login, the user 
will receive two tokens:
* The access token, which we aren't currently using (see below)
* The ID token, which we will be using to authenticate against the API.

The returned ID token is then used in the ``testbefund-auth-interceptor.service.ts``. The service
sets the ``Authorization`` header with the ``Bearer <token>`` value, allwoing access to the 
protected testbefund API.

### Setting up your own Azure AD Application
If you wish to run this application locally, you will need access to either the Testbefund Azure AD
or your own. 

You can easily set up your own Azure AD and your own application. To do so, please follow 
[Microsoft's Guide to Applications](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)

You will want to set the redirect URl to ``http://localhost:4200/login-successful``

**IMPORTANT** When setting up the redirect URLs, make sure to select ``Web Application`` to 
be able to use the auth code flow!

Once done, set your ``TENANT_ID`` and ``CLIENT_ID`` in the config.js.

### ID Token vs Access Token
We are using the ID token returned by Azure AD because, for some reasons, the Access token can not
be validated by spring security (or [jwt.io](jwt.io)...). This seems to be a known problem, which
Microsoft has yet to address.

## Starting the App
Once you got your configuration all set up, start ``testbefund-generator``
like any other angular app.
### yarn (preferred)
1. ``yarn install``
2. ``yarn run start``
3. Open ``http://localhost:4200/``
### npm
1. ``npm install``
2. ``npm run start``
3. Open ``http://localhost:4200/``

# Further Docs
* Read more about PDF creation [here](./docs/pdf.md)
* Read more about Testbefund [here](https://testbefund.de/)
* Check out our GitHub Organization [here](https://github.com/1-011-c)
