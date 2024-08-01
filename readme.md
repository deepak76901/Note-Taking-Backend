## Note-Taking Backend : Node.js

*To install All dependencies*
```
    npm i  
```

### How to Check API's endpoint

we have endpoint starting with **/api/notes/** , after it as you mention in Assignment. I was added every functionality mention in Assignment.

### To Create a Note

I already created 3 notes for testing purpose. So, ID startes from 4.

#### Pass Json In Body :
```
    {
        "title":"your Title",
        "content" : "your_content",
        "tags" : "tag_name"
    }
```

### Query on the basis of Tags

#### Pass Json In Body : 
```
    {
        "tag1":"tag_name",
        "tag2":"tag_name"
    }
 ```