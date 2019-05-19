# GitHub guide for contributors

## An introduction to Git and GitHub

Git is a system that enables thousands of people to work together on projects without central coordination.

Because of how useful this is, Git has a whole ecosystem built around it. You can think of Git as a tree trunk, and the services built around it as branches. One of these services is **GitHub**.

GitHub is a site optimized for hosting and sharing Git repositories (repositories are just a fancy name for projects). And while you don't strictly need GitHub to use Git, you'll find that it makes your life considerably easier.

At Aragon we choose to put a copy of our Git repository on GitHub for three reasons:

1. It's a full backup of our code (including the full history of changes).

1. It has an excellent User Interface that makes future collaboration easy.

1. It offers convenient ways to browse and search through our codebase.

## Editing a document on GitHub

Now that you have a high-level overview of both Git and GitHub, we're ready to cover how to edit a document.

If you don't have a GitHub account already, the first thing you should do is [sign up for one](https://github.com/join). Follow the instructions to create your account. It shouldn't take more than a couple of minutes.

The next step is to open the [Getting Started page](https://hack.aragon.org/docs/getting-started) of the hack Aragon docs.

![](/docs/assets/github-guide/gh-0-hq.png)

You should find that there is a light blue **EDIT** button in the top-right corner the page. This button is available on every page of the docs. Click on it. You'll be taken to a GitHub copy of the page.

![](/docs/assets/github-guide/gh-1-hq.png)

You should see a small pencil icon on the right-hand side. When you hover over it, it will turn blue, and you should see a small tooltip appear above it with the words:

> Edit the file in your fork of this project

<img src="/docs/assets/github-guide/gh-2-hq.png" alt="drawing" width="550"/>


[A fork](https://help.github.com/en/articles/fork-a-repo) is just GitHub's term for a copy of a project. In other words, clicking on the pencil icon tells GitHub to:

1. Create a copy (fork) of the project under your account.

1. Open up your copy of the Getting Started page for editing

Why do we need to fork? Why not just make changes directly in the original project?

Forking a project allows us to freely experiment with changes without affecting the original project. Put another way, a fork allows us to test out changes without messing up the work done in the original.

Later on, when we're happy with our changes, we can use our fork to propose changes to the original project.

Click on the pencil icon. You should be directed to a page with a built-in document editor.

![](/docs/assets/github-guide/gh-3-hq.png)

At the top you should see a message highlighted in a blue box. Don't worry about understanding what it means at this stage.

Right below the blue box you should see a line that reads:

> hack / docs / getting-started.md

<img src="/docs/assets/github-guide/gh-4-hq.png" alt="drawing" width="550"/>

This line gives us the location as well as the name of the document we are currently editing. In this case **getting-started.md** is the name of the document, and it's located in the **hack/docs** folder of our GitHub repository.

The **.md** file extension stands for **Markdown**. In GitHub's words:

> Markdown is a lightweight and easy-to-use syntax for styling all forms of writing on the GitHub platform.

If you're new to it, we recommend reading through this quick [Markdown guide](https://guides.github.com/features/mastering-markdown/) before moving on.

Really 😊, it'll take you 3 minutes, and will give you a much better understanding of the structure of the document we are about to edit.

## Your first edit

Suppose you've just learnt about [Aragon Court](https://github.com/aragon/aragon-court) and want to add a paragraph about it in the _What is Aragon and what does it do_ section. Something along the lines of:

> But that's not all. Through the [Aragon Network](https://aragon.org/network), Aragon also serves as the **world's first digital jurisdiction**: a decentralized, community governed jurisdiction with it's own decentralized court system. The network complements the project by providing infrastructure and services to users of the Aragon platform. 

The process couldn't be simpler. Just start writing directly in the document editor provided!

![](/docs/assets/github-guide/gh-5-hq.png)

When you're happy with the changes you've made, click on the **Preview changes** button at the top of the document editor.

![](/docs/assets/github-guide/gh-6-hq.png)

If you're happy with how it looks, you're ready to officially propose the file change.

Note that if you're unhappy with the result, you can click on the **Edit file** button to continue making changes.

## Proposing the file change

Scroll down to the bottom of the page You should see a box with the heading **Propose file change**.

![](/docs/assets/github-guide/gh-7-hq.png)

This is where the description of your proposed file change goes -- this is known in Git as a **commit message**.

You can think of a commit message as a short email explaining your proposal: the first text box is the subject line, and the second is the text body.

The [convention](https://github.blog/2011-09-06-shiny-new-commit-styles/) is to write it in the present tense. For example, if you fixed a bug, you would write _Fix bug_ and not _Fixed bug_.

In our case, in the first box we'll write:

> Update getting-started.md

And in the second we'll write a brief description:

> Add paragraph introducing Aragon Network in 'What is Aragon and what does it do' subsection.

![](/docs/assets/github-guide/gh-8-hq.png)

When you've written your message, click on the green **Propose file change** button.

## Comparing changes

If you've followed the above steps correctly, you should see a page with the header **Comparing changes**.

![](/docs/assets/github-guide/gh-9-hq.png)

Under the header, you should see a line that says:

> Choose two **branches** to see what's changed or to start a new **pull request**. If you need to, you can also compare across **forks**.

Before we move on, it's time to explain what these terms mean.

We've already explained the term [fork](https://help.github.com/en/articles/fork-a-repo) : remember it's just GitHub's term for a copy of a project.

We mentioned that when you click on the pencil icon to edit the document, GitHub creates a complete copy (fork) of the project under your account: we need a copy because we don't have the permissions required to directly edit the original project.

What we didn't cover is that clicking on this icon also creates what Git calls a **new branch**.

The ability to create branches is one of the most powerful features of Git: Branches are essentially self-contained copies of the project code.

A GitHub project always starts with one branch (the master branch). However, the usual Git workflow is to create a new branch every time you begin working on a new feature or bug fix.

Why is it good practice to create a new branch for every new feature? Why not just make changes directly to the master branch?

The problems with making changes directly to the master branch is that there may be others working on implementing new features at the same time as you.

If you're implementing your feature at the same time as someone else is implementing theirs, you might overwrite each others changes by mistake. This can get messy. So we try to avoid this.

The idea is that once we've implemented our changes in our branch, we can request to **merge** it into the original branch: which is basically a request to update the original branch with our changes. This is usually done using a **pull request**.

## Your first pull request

![](/docs/assets/github-guide/gh-10-hq.png)

[Pull requests](https://help.github.com/en/articles/about-pull-requests) let you tell others about changes you've pushed to a branch in a repository. Once a pull request is created, you can discuss and review the potential changes with collaborators (in this case the Aragon One team) before your changes are merged into the original (base) branch.

By now you should understand the gist of this page. So let's go ahead and click on **Create pull request**.

![](/docs/assets/github-guide/gh-11-hq.png)

You should see both a subject and a body field. In our case they have been automatically filled with our previous commit message.

At this stage you should add any issues you think exist with the pull request to the body, as well as any questions you may have for the Aragon team.

If you haven't already, this is a good time to familiarize yourself with Aragon's [contribution guidelines](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md).

Once you're confident you've satisfied the guidelines, click on **Create pull request** again.

![](/docs/assets/github-guide/gh-12-hq.png)

Congratulations! 🎉 You've just opened your first pull request.

Don't worry if it isn't perfect (no pull request is). You'll be assigned one or more reviewers. They'll help you improve it and fix any problems.


## Adjusting your pull request

After making a pull request, you may want to make an adjustment or an addition.

Making an adjustment is as simple as editing the relevant file(s) in your branch and committing the change.

Don't worry, you won't have to make a new pull request every time you change something. GitHub ensures your pull request automatically tracks the changes in your branch and updates accordingly.

Let's go through an example.

Under the _Update getting-started.md_ header you should see a line that reads:

> _username_ wants to merge 1 commit into aragon:master from _username:branchname_

Note that, in the text above, _username_ and _branchname_ are just placeholders for your user and branch names.

In my case, my username is _sysl91_ and the name of the branch I'm working in is _patch-1_, so I would click on _sysl91:patch-1_.

To access your branch, click on your _username:branchname_ (it should be highlighted in blue).

<img src="/docs/assets/github-guide/gh-13-hq.png" alt="drawing" width="550"/>

This will open up the branch you've created in your fork of the **hack** project.

![](/docs/assets/github-guide/gh-14-hq.png)

Click on the **docs** folder (remember, the getting-started.md page we want to edit is located in the docs folder).

![](/docs/assets/github-guide/gh-15-hq.png)

Now click on **getting-started.md**.

You should find yourself back at the GitHub copy of the Getting Started page.

![](/docs/assets/github-guide/gh-16-hq.png)

From here on in the workflow is pretty much the same as before.

Click on the pencil icon to start editing.

<img src="/docs/assets/github-guide/gh-2-hq.png" alt="drawing" width="550"/>

Say we want to make a change to the paragraph we added. For example, say we want to add a link to make it easy for readers to find out more about the decentralized court system.

> But that's not all. Through the [Aragon Network](https://aragon.org/network), Aragon also serves as the **world's first digital jurisdiction**: a decentralized, community governed jurisdiction with it's own [decentralized court system](https://github.com/aragon/aragon-court). The network complements the project by providing infrastructure and services to users of the Aragon platform.

As before, we can make this change directly in the editor.

![](/docs/assets/github-guide/gh-17-hq.png)

We can then preview it.

![](/docs/assets/github-guide/gh-18-hq.png)

And if we're happy with the result, scroll to the bottom and commit it.

![](/docs/assets/github-guide/gh-19-hq.png)

And voila! That's all there is to it 😊. 
