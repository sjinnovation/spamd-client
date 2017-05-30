# Duke Mail Local  Libraries

This repository contains libraries that use in microservices of project.
Each branch is separated library or wrap that can be use as external npm dependency.

For use some local library you need add next string to `package.json`:
```
{
    "dependencies": {
        "library-name": "git+ssh://git@sjinnovation.git.beanstalkapp.com:/sjinnovation/duke-mailservice-libs.git#library-name"
    }
}
```

That's all. Now you can require installed dependencies as simple npm module

```javascript
const libraryName = require('library-name');
```

:)