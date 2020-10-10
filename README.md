# Notes

`www.mysite.com/users/add` - The word add is a verb, which makes this a non-RESTful URL. Only nouns go into the
URL because nouns describe things or states of things

```js
const app = express();
app.get("/cars/:vin", function(inRequest, inResponse) {
// Return a car object with the specific VIN number
});
app.listen(8080);
```
> vin (which you can then access in the function by doing inRequest.params.vin).

`app.use(express.json());` - This middleware takes care of parsing incoming request bodies that contain JSON,
as many of ours will. Our application code will, thanks to this middleware, receive a
JavaScript object resulting from the incoming data, saving us the hassle of parsing it
ourselves.

## resources consumed
- A word on [ES6 classes](https://youtu.be/RBLIm5LMrmc?list=WL) - Brad Traversy.