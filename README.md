# messenger-chat-bot-skeleton
Tutorial and skeleton to build a Facebook Messenger chatbot

You will need to download a tunneling service if you want to access the bot from your any other decive while the app is not published, I suggest either Ngrok or localtunnel. Alternatively you can use localhost if you will just be using the computer that is running the server.

First open the directory in terminal and run 'npm i'

Next, log into facebook make sure you have at least one page created(this wll be the name and image of your bot).

Go to https://developers.facebook.com/ and login with a facebook account.

Hover over 'My Apps' in the top right corner and click 'Add a New App'.

Go to the Dashboard and reveal your 'App Secret', copy that and paste it into the .env.

Next click on '+ Add Product' on the sidebar and add 'Messenger' and 'Webhooks'.

Click on 'Messenger' 'Settings' on the sidebar and the page will focus on 'Token Generation'.

Select a page, approve access, copy the 'Page Access Token' and paste in the .env.

If your are using ngrok, in another termial tab run `path/to/ngrok http 8080` or for localtunnel `lt --port 8080`,
both of which will display a URL.

Copy and paste this URL into the .env. 

In the .env choose a 'MESSENGER_VERIFY_TOKEN', can be anything you like but keep it a secret.

Now in the terminal tab with the skeleton directory run 'npm run local'

Back on the Facebook Developer site scroll down to 'Webhooks' and click 'Setup Webhooks'.

Go ahead and put the URL you just created in the 'Callback URL' field and add /bot/webhook to the end, should look somehting like `https://da138772.ngrok.io/bot/webhook`. Next the token you just created in the 'Verify Token' field.

In the subscription fields check off 'messages', 'messaging_postbacks' and 'messaging_referrals' and then click 'Verify and Save'.

Once the callback url has been verified scroll back down to webhooks and now you can select a page to subscribe to.

Click the drop down and select the page you intend for the bot then click subscribe.

Now go to https://www.messenger.com and search for the name of the page you subscribed to the bot. You should be presented with a chat window with a 'Get Started' button at the bottom, if not check your page subscriptions.

Your chatbot is now running. I you want other to be able to access the bot while not published ensure you are using a tunneling service and you will have to add them as 'Developers' or 'Testers' in the 'Roles' tab on the sidebar.

If at any point the bot setup fails with a null value `null '=============> Error at Set Extension URL'` the connection with facebook timed out, just restart the server and the update should pass.
