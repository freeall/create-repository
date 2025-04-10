git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/sitibo.git
git push -u origin main# create-repository

Easily set up a new github repository. Reads the name/description from the package.json file if it's present. Sets origin upstream if it's not already set.

```
npm install create-repository -g
```

## Usage

`create-repository` will try to read `package.json` and use the name and description properties.

```
$ create-repository
```

You can also pass values for name and description.

```
$ create-repository --name my-new-project --description "That's all I have to say about that"
```

## License

MIT
