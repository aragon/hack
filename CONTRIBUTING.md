# Contributing to the Aragon documentation

😊🎉 First off, thanks for taking the time to contribute! 🎉😊

The sections below cover our documentation guidelines, the different ways you can contribute, and how to ask for help.

All members of our community are expected to follow our [Code of Conduct](https://wiki.aragon.org/about/code_of_conduct/). In short, we expect you to be friendly and welcoming in all of our spaces.

## Get Rewarded

We are starting to experiment with bounties using the very same tools we are building in Aragon. In particular the [Projects app](https://www.autark.xyz/projects-app) of The Planning Suite made by Autark team. 

Look for the [💰funded](https://github.com/aragon/hack/issues?q=is%3Aissue+is%3Aopen+label%3A%22💰+funded%22) label on issues and ask the mantainers to guide you through the bounty workflow. 

You will apply to the boutnies on our own DAO, [follow the link to explore it.](https://rinkeby.aragon.org/#/meshteam/0x2b2290c2370cbc59e7c77bd36072f801d5e996c8)

We will create a guide shortly with a walkthrough the whole process. Stay tuned 🙌

## Ways to contribute

### Filing an issue
If you see a problem with the docs that should be improved, you can simply report it in our [issue tracker](https://github.com/aragon/hack/issues).  Please take a quick look to see if the issue doesn't already exist before filing yours.

Do your best to include as many details as needed in order to make it as easy as possible for someone else to fix the problem and resolve the issue.

### Fixing an issue
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

For a great tutorial on the above workflow see [here](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

### Editing in the browser

Besides setting up a local instance of the docs for editing, you can also edit a page directly through your browser. To start this process click on the light blue **EDIT** link in the top-right corner of any page. You'll be redirected to a github copy of the page. Click on the pencil icon in the top right to start editing.

If you don't have any programming experience or if this is your first time contributing to an open-source project, don't worry. We've created a [GitHub guide](/docs-internal/github-guide.md) just for you 😊.


## Documentation guidelines
To ensure our docs are kept as clear and consistent as possible, please make sure any contributions adhere to the following guidelines:

1. Follow [Strunk and White](http://www.jlakes.org/ch/web/The-elements-of-style.pdf) for grammar and punctuation.
2. Don’t include closing “;” at the end of statements in JS code blocks.
3. Use single quotes in JS code blocks.
4. “JS” should be capitalized.
5. Pay attention to the correct naming for parts of the Aragon stack.  For example, it's "aragonOS" not "Aragon OS".


## Getting help
If you need help, please reach out to Aragon core contributors and community members in one of our [Aragon Spectrum channels](https://spectrum.chat/aragon).  We'd love to hear from you and know what you're working on!
