# Authentication API docs (in progress)

### Introduction

The goal for the native app is to get a token that it can use to authenticate API requests on behalf of the user. All login complexities, multiple providers, etc. are handled by the website and not by the app.

#### STEP A.1

When the user clicks the LOGIN button in the app, it should open a webview directed to `https://beta.carrismetropolitana.pt/token`. The website handles the login with providers, account creation, email verification, etc.

#### STEP A.2

The app only needs to check (eg. every second) if the URL of the webview contains a parameter named "token". For example, before login the URL of the webview will be `https://beta.carrismetropolitana.pt/token`, but after login the URL of the webview will be something like `https://beta.carrismetropolitana.pt/token?token=eyJhbGciOiJIUzI1...`.

When it is detected that the webview URL contains the token, the app should save the token to the device storage and close the webview. The app can now use this token to authenticate requests on behalf of the user.

#### STEP 3

To authenticate the request the app should set an HTTP header named `Authorization` with the value `Bearer eyJhbGciOiJIUzI1...`.

---

### The `/api/profile` endpoints

#### `GET /api/profile`

Use this endpoint to retrieve information about the user. Relevant properties are:

```
{
    display_name: "Manuel Antunes",
    email: "manuel.antunes@gmail.com",
    favorite_stops: ["010101"],
    favorite_patterns: ["1001_0_1"],
    ...
}
```

#### `POST /api/profile/edit/favorites`

Use this endpoint to update favorites for the user. Always send all the favorite_stops and favorite_patterns currently set by the user. To remove a stop or pattern just do not include it in this request. Doing this replaces the favorites for the user. All other properties (name, email, etc.) should be edited on the website.

Example request:

```
{
    "favorite_stops": ["010101"],
    "favorite_patterns": ["1001_0_1"]
}
```

When the user adds another favorite stop, the request should be like so:

```
{
    "favorite_stops": ["010101", "060101"],
    "favorite_patterns": ["1001_0_1"]
}
```

If you'd like to unfavorite a stop then remove it from the request:

```
{
    "favorite_stops": ["060101"],
    "favorite_patterns": ["1001_0_1"]
}
```

### Note on usability

Instead of presenting a webview, it is possible to send the user to the device browser to login, and then the website redirects the user back to the app. This uses deep linking URLs that need to be configured in the app. This might be the way forward because users, when logging in, receive an email with a link, and the link opens in the browser and not on the webview. In this situation, the flow should be updated:

#### STEP B.1

When the user clicks the LOGIN button in the app, it should send it to the device browser to `https://beta.carrismetropolitana.pt/token`. The website handles the login with providers, account creation, email verification, etc.

#### STEP B.2

The app waits to receive a call on the pre-defined deep linking URL. This URL contains a parameter named "token" that should be saved to the device storage and used to authenticate API requests on behalf of the user.

The URL will be something like `app://carrismetropolitana/?token=eyJhbGciOiJIUzI1...`.

For this to work this needs to be configured in the app manifest. More info on [Stack Overflow](https://stackoverflow.com/a/53203139) and [Google Documentation](https://developer.android.com/training/app-links/deep-linking)
