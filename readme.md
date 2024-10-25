[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# React Modal (Student project)

> This package provides a fully customizable, ready-to-use modal component for React TypeScript projects. Developed as part of an OpenClassrooms project, this modal is designed for quick integration and flexible configuration, allowing for easy control over visibility and closing actions, with customizable styling via CSS.

## Prerequisites

This project requires react >= 18


## Table of contents

- [React Modal](#react-modal-student-project)
    - [Prerequisites](#prerequisites)
    - [Table of contents](#table-of-contents)
    - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Options](#options)
      - [shouldCloseOnOverlayClick](#shouldCloseOnOverlayClick)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/ORG/PROJECT.git
$ cd PROJECT
```

To install and set up the library, run:

```sh
$ npm install react-modal-oop-project
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev react-modal-oop-project
```

## Usage

```tsx

const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    return (
        <ReactModal 
            open={isOpen}
            onClose={closeModal}
        >
            <h1>Test</h1>
            <p>
                content hello Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. A, adipisci animi dicta dolore dolorum eos fugit in labore nisi
                nobis non numquam quaerat quam quod, repellendus soluta tempora
                voluptate voluptatum!
            </p>
        </ReactModal>
    )
}
```

#### Options

[shouldCloseOnOverlayClick](#shouldCloseOnOverlayClick)

| Type    | Default value |
|---------|---------------|
| boolean | false         |

If present, the request will be performed as soon as the component is mounted

Example:

```tsx
const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    return (
        <ReactModal
            open={isOpen}
            onClose={closeModal}
            options={{
                shouldCloseOnOverlayClick: true,
            }}
        >
            <h1>Test</h1>
            <p>
                content hello Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. A, adipisci animi dicta dolore dolorum eos fugit in labore nisi
                nobis non numquam quaerat quam quod, repellendus soluta tempora
                voluptate voluptatum!
            </p>
        </ReactModal>
    )
}
```


## Authors

* **Dubar Jérémy** 

## License
[MIT License](https://andreasonny.mit-license.org/2019) © Andrea SonnY