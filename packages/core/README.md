# @sumiml/core

## Example

```
<SumiML version="1.0" />
<Frontmatter>
title: "SumiML sample"
</Frontmatter>
<Document>
<Section title="Section 1">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Section>
..
</Document>
```

## Syntax

### text and block

```
block ::= markup | scope
```
`block` is scoped context in the document, typically surrounded by **tag**. A tag has a **name**(this explains the role of the block) and may have some **attributes**:
```
// Example
<MyBlock title="sample" visible=True>Hello</MyBlock>
```
In this example, `MyBlock` block has two attributes `title` and `visible`, and has content `Hello` (actually which is classified as `text`).


`markup` and `scope` are subcategories of `block`.

- `scope` block defines some specific area in the document. A `scope` may contain other `scope`-level blocks as well as plain text and `markup`.
- `markup` block describes specific text-fragment in the document, which should be distinguished from other plain text: such as **Bold-style** element, **Link** element. `markup` block has no child node: in other words, the tag of `markup` surrounds only `text`.


`text` is a plain text which is not a `block`. `text` has no child node.

### root

```
root ::= directive frontmatter? document?
```

### frontmatter

```
frontmatter ::= <Frontmatter> yaml </Frontmatter>
```
where `yaml` requires yaml(`.yml`)-format text.

### document

```
document ::= <Document> ( text | block )* </Document>
```

### section, subsetion, and subsubsection

```
section ::= <Section> ( text | block | subsection )* </Section>
subsection ::= <Subsection>  ( text | block | subsubsection )* </Subsection>
subsubsection ::= <Subsubsection> ( text | block )* </Subsubsection>
```

