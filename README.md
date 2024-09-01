# Zania

This is the task for the Senior Software Engineer (Frontend) role at Zania.

In order to make it easy for you guys to test the app, I have gone ahead and deployed it on vercel - (insert link). You can go to the link and test the app.

I received a task PDF which was for a full stack task and I was told to just do the frontend related tasks. Hopefully I haven't missed something crucial.

### Features

1. The app loads with 5 cards initially with static data defined in code.
2. The app will store the cards position on app load. (not something required, just mentioning).
3. You will see a spinner while the images loads in the card.
4. You can click on any image in the card and it will open that image in the overlay/modal in the middle. Clicking on the background of the modal or pressing ESC key will close the overlay/modal.
5. You can drag a card from the image and then when you hover over any other image, it will "swap". If you release the mouse, it will drop it.
6. The auto saver at 5s, will check if the order has changed or not. It will only save if the order was manipulated.
7. You will see the saving state or last save timestamp at the top left.
8. I have used no extra state management library like Zustand, Redux, React-Query but only used Context. I know context isn't the replacement of the traditional state management tools but this app was trivial and didn't need any library. It would have just made the solution extra complicated.

There were a few parts of the tasks steps in the PDF that I couldn't figure out or probably wasn't needed for frontend role. Let me explain :

1. In "Part 2: Making the call", I couldn't get the MSW library to work. So I did write some "fake API calls" code which is basically making use of SetTimeout along with Promise to pretend to be an API call. Also, I used local storage to persist data across reloads.
2. In "Part 4: Deployment", as my task was purely frontend, I have just deployed the React App using Vercel. Docker is probably for the API services or maybe you wanted the web app to be in a docker container too? I am not sure.
3. For the "Part 5: General questions" section, although it seems like a question more suitable for fullstack or backend role but I would still like to answer it. I would have only 1 API that gets called to store the "order of cards" on all the actions - reorder card, add card or remove card. It's not necessary to use extra APIs for add and remove because in the end, when you add a card, the order just changes by adding a card at the end and when you remove a card, you just change the order by moving the cards up by 1 position from the position from where the card was removed. I hope I was able to convey what I mean.
