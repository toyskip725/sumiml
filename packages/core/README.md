# @sumiml/core

This module includes core system (parser / generator / config interface) and basic generator implementation of **SumiML**.


# 1. Core Concepts

## 1.1. Abstract syntax tree
sumiml core system is designed based on the concept of **AST**(Abstract Syntax Tree)-based parsing / generating.

``` mermaid
flowchart LR
  sumiml["sumiml (.suml)"] -- parse --> ast([AST]);
  ast -- generate --> html["HTML (.html)"];
  ast -- generate --> tex["TeX (.tex)"]
```

- The sumiml **parser** translates a single sumiml document into AST.
- The sumiml **generator** translates a document-level AST into some other text-format, such as HTML or TeX.

## 1.2. Plugins



# 2. Core Syntax

## 2.1. Example

Typically a sumiml document `.suml` is written in the format like the following example:

```
<SumiML version="1.0" />
<Frontmatter>
title: "SumiML sample"
created: 2024/xx/xx
</Frontmatter>

<Document>

<Section title="Section 1">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Section>
...

</Document>
```

## 2.2. Document structure

A SumiML document should have single `<root>` structure, as follows:

```
<root> ::= <directive> <frontmatter> <document>
<directive> ::= '<SumiML version="<version>" />'
<frontmatter> ::= '<Frontmatter>' <yaml> '</Frontmatter>'
```

where 
- `<version>` requires major / minor version (for example, `1.0`).
- `<yaml>` requires yaml(`.yml`)-format text.



## 2.3. Text and tag elements

### 2.3.1. Tag

**Tag** is the sumiml document element surrounded by specific character `<` and `>` .

(1) A tag has two forms: **opening tag** form and **closing tag** from. Any opening tag must have corresponding closing tag in the document.

(2) A tag has a **name**(this explains the role of the block) and may have some **attributes**.

```
// Example
<Myelement title="sample" visible=True>
Hello
</Myelement>
```
In this example, 

- the name of the tag is `Myelement`.
- the opening tag of the tag is `<Myelement title="sample" visible=True>`.
- the closing tag of the tag is `</Myelement>`.
- the tag has two attributes `title` and `visible`.

### 2.3.2. Newline and text

**Text** is the sumiml document element without opening / closing tag.

- `<inline-text>` (also called **text content**) cannot contain newline symbols.
- `<block-text>` (also called **raw text**) can contain newline symbols.

### 2.3.3. Tag elements

**Tag element** is the sumiml document element with opening / closing tag. There are four basic category in tag element: **scope**, **enumeration**, **display**, and **markup**.

#### scope

```
<scope> ::= <opening-tag> (<scope> | <enumeration> | <display> | <markup> | <text>)+ <closing-tag>
```
`<scope>` defines some specific subarea in the document, such as *Section* element. In sumiml `<scope>` is the most general and fundamental tag element, in the sense that `<scope>` *accepts any element as its child*. Thus `<scope>` is one of the recursive element in sumiml, because `<scope>` also accepts any other `<scope>` as its child. 

#### enumeration

```
<enumeration> ::= <opening-tag> (<enumeration> | <enumeration-item>)+ <closing-tag>
```

`<enumeration>` represents some restricted recursive structure in the document, such as ordered / unordered *List* element.

#### display

```
<display> ::= <opening-tag> <block-text> <closing-tag>
```
`<display>` describes specific block-level text fragment in the document, which should be distinguished from other plain text block, such as *Blockquote* element.

#### markup

```
<markup> ::= <opening-tag> <inline-text> <closing-tag>
```

`<markup>` describes specific inline-level text fragment in the document, which should be distinguished from other plain text, such as *Bold-style* element or *Link* element. `<markup>` block has no child node: in other words, the tag of `<markup>` surrounds only inline text.


# 3. `@sumiml/core` Elements

## scope

| name | attributes | overview | 
| --- | --- | --- |
| `<Section>` | `title` | a section in the document |
| `<Subsection>` | `title` | a subsection in the section |
| `<Subsubsection>` | `title` | a subsection in the subsection |

## enumeration

| name | attributes | overview | 
| --- | --- | --- |
| `<List>` | `type` (must be `ordered` or `itemized`) | a list | 

## display

| name | attributes | overview | 
| --- | --- | --- |
| `<Math>` | | block math |
| `<Blockquote>` | | block quote |

## markup

| name | attributes | overview | 
| --- | --- | --- |
| `<Strong>` | | strong element | 
| `<Emphasis>` | | emphasized element |
| `<Link>` | `href` | link element |