# article-manager

### Create user

#### Request

-   Method: **POST**
-   URL: `/users`
-   Headers：`Content-Type=application/json`
-   Body:

```
{
	"name":"androvideo",
	"email":"androvideo@gmail.com",
	"password":"androvideo"
}
```

#### Response

-   Body

```
{
    "user": {
        "_id": "5dd58fd8d8975f40f04ab8e2",
        "name": "androvideo",
        "email": "androvideo@gmail.com",
        "createdAt": "2019-11-20T19:11:20.603Z",
        "updatedAt": "2019-11-20T19:11:20.634Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ1OGZkOGQ4OTc1ZjQwZjA0YWI4ZTIiLCJpYXQiOjE1NzQyNzcwODB9.oxW6yuLGhrnn1NOc7u4W2QqQ3VXYy_DTy2er-4heRnY"
}
```

### Login user

#### Request

-   Method: **POST**
-   URL: `/users/login`
-   Headers：`Content-Type=application/json`
-   Body:

```
{
	"email":"example@gmail.com",
	"password":"example"
}
```

#### Response

-   Body

```
{
    "user": {
        "_id": "5dd58f35d8975f40f04ab8db",
        "name": "PeterLiu",
        "email": "example@gmail.com",
        "createdAt": "2019-11-20T19:08:37.767Z",
        "updatedAt": "2019-11-20T19:09:51.918Z",
        "__v": 6
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ1OGYzNWQ4OTc1ZjQwZjA0YWI4ZGIiLCJpYXQiOjE1NzQyNzY5OTF9.ktUQELE5LZgtt0mk_2o317eYBURgrCR3KlOsuugBPeI"
}
```

### Logout user

#### Request

-   Method: **POST**
-   URL: `/users/logout`
-   Headers：

```
Content-Type=application/json
Authorization=Bearer Token
```

-   Body:

```

```

#### Response

-   Body

```
Logged out!
```

### Logout all device

#### Request

-   Method: **POST**
-   URL: `/users/logoutAll`
-   Headers：

```
Content-Type=application/json
Authorization=Bearer Token
```

-   Body:

```

```

#### Response

-   Body

```
logged out all device
```

### Create article

#### Request

-   Method: **POST**
-   URL: `/articles`
-   Headers：`Content-Type=application/json`
-   Authorization : `Bearer Token`
-   Body:

```
{
	"subject":"androvideo2",
	"content":"androvideo2"
}
```

#### Response

-   Body

```
{
    "content": "androvideo2",
    "_id": "5dd59011d8975f40f04ab8e5",
    "subject": "androvideo2",
    "owner": "androvideo",
    "createdAt": "2019-11-20T19:12:17.529Z",
    "updatedAt": "2019-11-20T19:12:17.529Z",
    "__v": 0
}
```

### Update article

#### Request

-   Method: **PATCH**
-   URL: `/articles/:id`
-   Headers：`Content-Type=application/json`
-   Authorization : `Bearer Token`
-   Body:

```
{
	"subject":"updatedSub",
	"content":"updatedContent"
}
```

#### Response

-   Body

```
{
    "content": "updatedContent",
    "_id": "5dd59011d8975f40f04ab8e5",
    "subject": "updatedSub",
    "owner": "androvideo",
    "createdAt": "2019-11-20T19:12:17.529Z",
    "updatedAt": "2019-11-20T19:12:39.331Z",
    "__v": 0
}
```

### Read articles

#### Request

-   Method: **GET**
-   URL: `/articles?rowPerPage=10&page=1&sortBy=createdAt:desc`
-   Authorization : `Bearer Token`
-   Body:

```

```

#### Response

-   Body

```
[
    {
        "content": "androvideo",
        "_id": "5dd58ff5d8975f40f04ab8e4",
        "subject": "androvideo",
        "owner": "androvideo",
        "createdAt": "2019-11-20T19:11:49.763Z",
        "updatedAt": "2019-11-20T19:11:49.763Z",
        "__v": 0
    }
]
```

### Delete article

#### Request

-   Method: **DELETE**
-   URL: `/articles/:id`
-   Authorization : `Bearer Token`
-   Body:

```

```

#### Response

-   Body

```
{
    "content": "updatedContent",
    "_id": "5dd59011d8975f40f04ab8e5",
    "subject": "updatedSub",
    "owner": "androvideo",
    "createdAt": "2019-11-20T19:12:17.529Z",
    "updatedAt": "2019-11-20T19:12:39.331Z",
    "__v": 0
}
```

### list articles

#### Request

-   Method: **GET**
-   URL: `/articles/listAll?rowPerPage=10&page=1&sortBy=createdAt:desc`
-   Body:

```

```

#### Response

-   Body

```
[
    {
        "content": "nope!",
        "_id": "5dd58f89d8975f40f04ab8e0",
        "subject": "heySUB!",
        "owner": "PeterLiu",
        "createdAt": "2019-11-20T19:10:01.193Z",
        "updatedAt": "2019-11-20T19:10:01.193Z",
        "__v": 0
    },
    {
        "content": "no content!",
        "_id": "5dd58fa6d8975f40f04ab8e1",
        "subject": "test2",
        "owner": "PeterLiu",
        "createdAt": "2019-11-20T19:10:30.707Z",
        "updatedAt": "2019-11-20T19:10:30.707Z",
        "__v": 0
    },
    {
        "content": "androvideo",
        "_id": "5dd58ff5d8975f40f04ab8e4",
        "subject": "androvideo",
        "owner": "androvideo",
        "createdAt": "2019-11-20T19:11:49.763Z",
        "updatedAt": "2019-11-20T19:11:49.763Z",
        "__v": 0
    }
]
```
