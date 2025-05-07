# Trully Magic in React Native project example

## How to use it

1. Create a webhook from [webhook.site](https://webhook.site) (Make sure you
   edit the webhook to enable CORS)
2. Go to client [Dashboard](https://sandboxapp.trully.ai) and copy your API KEY.
3. Clone this repository
4. Open Visual Studio Code
5. Open <i>Config.tsx<i>. Replace the corresponding values of the CONFIG object
6. Run app using <b>npm run android</b> or <b>npm run ios</b>. If you're a
   Mac/Linux user make sure to add sudo before npm command

## ⚠️ Important - Webhook token

The webhook token is the text you see after the <i>https://webhook.site/</i>.
I.e if your url is <i>https://webhook.site/123-456</i> then your token would be
<i>123-456</i>

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
got the result, it will send it to the Webhook. In order to know WHEN we have
available the user data on the Webhook we're using the Deep Linking technique.
For this, it's important to properly configure the <b>App.js</b> file. Make sure
you read and understand it's configuration so you can apply it to your project.
