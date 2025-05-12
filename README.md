# Trully Magic in React Native project example

## How to use it

1. Go to client [Dashboard](https://sandboxapp.trully.ai) and copy your API KEY.
2. Clone this repository
3. Open Visual Studio Code
4. Open <i>Config.tsx<i>. Replace the corresponding values of the CONFIG object
5. Run app using <b>npm run android</b> or <b>npm run ios</b>. If you're a
   Mac/Linux user make sure to add sudo before npm command

## ⚠️ Important - Repeat test

To repeat the tests after a successful try make sure you change the USER_ID
value

### How it works

#### Camera and Location permissions

The Magic Link will ask the user to take pictures of their INE and a Selfie.
Also, it will try to recover the user location. Given that it's a webpage embed
using a WebView we need to ask permission BEFORE launch it. Don't forget to add
the corresponding permissions to the Manifest and InfoPlist files using the
<b>App.js</b> file. You can use this project <b>App.js</b> file as an example.

#### Getting Results

The Magic Link will send the data to be analyzed by the Decision Maker. Once it
got the result, it will be available through the <i>/v2/history/request</i>
endpoint. In order to know WHEN to retrieve the user data we're using the Deep
Linking technique. For this, it's important to properly configure the
<b>App.js</b> file. Make sure you read and understand it's configuration so you
can apply it to your project.

##### /v2/history/request

To get the data for each process you should add the <i>?magic_link_token</i>
query param. You'll find the token in the json response from the Magic Link
creation.
