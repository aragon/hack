# Contributing to the Aragon documentation

Would you like to help improve these Aragon developer docs? Awesome! Feel welcome and read the following sections in order to know how to ask questions and how to work on something.

All members of our community are expected to follow our [Code of Conduct](https://wiki.aragon.org/documentation/Code_of_Conduct/). Please make sure you are welcoming and friendly in all of our spaces.


## Ways to contribute

### File an issue
If you see a problem with the docs that should be improved, you can simply report it in our [issue tracker](https://github.com/aragon/hack/issues).  Please take a quick look to see if the issue doesn't already exist before filing yours.

Do your best to include as many details as needed in order for someone else to fix the problem and resolve the issue.

### Fix an issue
You can browse our [issue tracker](https://github.com/aragon/hack/issues) and choose an issue to fix.  Or, if you spot something in the docs that needs fixing, you can go right in and fix it without creating an issue first.  The development process follows one typical of open source contributions. Here's a quick rundown:

1. [Find an issue](https://github.com/aragon/hack/issues) that you are interested in addressing or a feature that you would like to add.
2. Fork the repository to your local GitHub organization. This means that you will have a copy of the repository under ```your-GitHub-username/hack```.
3. Clone the repository to your local machine using ```git clone https://github.com/github-username/hack.git```.  You can follow the instructions in the [readme](https://github.com/aragon/hack/blob/master/readme.md) file to run the docs locally.
4. Create a new branch for your fix using ```git checkout -b branch-name-here```.
5. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
6. Use ```git add insert-paths-of-changed-files-here``` to add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.
7. Use ```git commit -m "Insert a short message of the changes made here"``` to store the contents of the index with a descriptive message.
8. Push the changes to the remote repository using ```git push origin branch-name-here```.
9. Submit a pull request in github to the upstream repository.
10. Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can use a title like "Added more log outputting to resolve #4352".
11. In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is). The reviewer will be able to help you fix any problems and improve it!
12. Wait for the pull request to be reviewed by a maintainer.
13. Make changes to the pull request if the maintainer recommends them.
14. Celebrate your success after your pull request is merged!

Besides this method of setting up a local instance of the docs for editing, you can also edit a page directly through your browser.  Start this process by clicking the "EDIT" link in the top-right corner of any page and then clicking the pencil icon in the github copy of the page.


## Documentation guidelines
In our efforts to keep the docs clear and consistent throughout and as useful as possible for people, please make sure any contributions adhere to the following guidelines:

1. Follow [Strunk and White](http://www.jlakes.org/ch/web/The-elements-of-style.pdf) for grammar and punctuation.
2. Don’t include closing “;” at the end of statements in JS code blocks.
3. Use single quotes in JS code blocks.
4. “JS” should be capitalized.


## Getting help
If you need help, please reach out to Aragon core contributors and community members.  Ask questions in the [#dev-help channel](https://aragon.chat/channel/dev-help) on the Aragon Chat.  We'd love to hear from you and know what you're working on!