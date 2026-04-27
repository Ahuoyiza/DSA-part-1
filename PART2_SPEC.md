# DSA Lesson 11 — Part 2 Spec

## Overview
Add 10 new pages (11–20) covering advanced DSA topics. Same visual system as Part 1.

---

## New Pages

| # | File | Title | Section |
|---|------|--------|---------|
| 11 | page-11.html | Hash Tables | Advanced Structures |
| 12 | page-12.html | Trees & Binary Trees | Advanced Structures |
| 13 | page-13.html | Binary Search Trees | Advanced Structures |
| 14 | page-14.html | Heaps & Priority Queues | Advanced Structures |
| 15 | page-15.html | Graphs | Advanced Structures |
| 16 | page-16.html | BFS & DFS | Algorithms |
| 17 | page-17.html | Sorting Algorithms | Algorithms |
| 18 | page-18.html | Searching Algorithms | Algorithms |
| 19 | page-19.html | Recursion | Algorithms |
| 20 | page-20.html | Dynamic Programming | Algorithms |

---

## Page Template (every page follows this structure exactly)

```html
<!-- PAGE XX — Title -->
<div class="page-hero">
  <div class="page-num-badge">
    [relevant inline SVG icon, 14×14]
    Lesson XX
  </div>
  <h1 class="page-title">Title</h1>
  <div class="page-definition">
    <p>"One-sentence definition as a quote."</p>
  </div>
</div>

<div class="page-content">

  <!-- Section 1: What is it? -->
  <div class="content-section">
    <h2 class="section-title">[SVG] What is a [Topic]?</h2>
    <p>Teaching paragraph...</p>
    [SVG hand-drawn diagram — unique per page]
    <div class="callout callout-analogy">...</div>
  </div>

  <hr class="divider"/>

  <!-- Section 2: How it works -->
  <div class="content-section">
    <h2 class="section-title">[SVG] How It Works</h2>
    <p>Teaching paragraph...</p>
    [SVG diagram or second callout]
    <div class="callout callout-warning OR callout-insight">...</div>
  </div>

  <hr class="divider"/>

  <!-- Section 3: Code -->
  <div class="content-section">
    <h2 class="section-title">[SVG] Common Operations</h2>
    <div class="tabs">
      <div class="tab-bar">
        <button class="tab-btn" data-pane="[id]-js">JavaScript</button>
        <button class="tab-btn" data-pane="[id]-ts">TypeScript</button>
        <button class="tab-btn" data-pane="[id]-py">Python</button>
      </div>
      [3 tab-pane divs with code-block inside each]
    </div>
  </div>

  <hr class="divider"/>

  <!-- Section 4: Complexity Table -->
  <div class="content-section">
    <h2 class="section-title">[SVG] Complexity Summary</h2>
    <div class="table-scroll">
      <table class="complexity-table">
        <thead><tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr></thead>
        <tbody>
          [rows using badge classes: badge-o1, badge-ologn, badge-on, badge-on2]
        </tbody>
      </table>
    </div>
  </div>

  <hr class="divider"/>

  <!-- Section 5: Real World Cards -->
  <div class="content-section">
    <h2 class="section-title">[SVG] Where You'll See This in the Real World</h2>
    <div class="rw-grid">
      [4 × rw-card divs]
    </div>
  </div>

</div>
```

### Callout types available
- `callout-analogy` — blue-green, person icon
- `callout-warning` — amber, triangle icon  
- `callout-insight` — purple/teal, lightbulb icon

### Badge classes
- `badge-o1` — green (O(1))
- `badge-ologn` — teal (O(log n))
- `badge-on` — amber (O(n))
- `badge-on2` — red (O(n²) or worse)

### Code syntax spans
- `<span class="kw">` — keywords (const, let, def, class)
- `<span class="fn">` — function names
- `<span class="str">` — strings
- `<span class="num">` — numbers
- `<span class="cm">` — comments
- `<span class="op">` — operators
- `<span class="tp">` — types (TS only)

---

## Content Outline Per Page

### Page 11 — Hash Tables
- **Definition:** "A hash table maps keys to values using a hash function — turning any key into an array index for near-instant O(1) average lookup."
- **Sections:** What is a Hash Table | Collisions & Chaining | Common Operations (get/set/delete) | Complexity | Real World
- **Diagram 1:** Key → hash function → bucket index (arrow flow)
- **Diagram 2:** Collision via chaining (linked list hanging from bucket)
- **Real world:** JavaScript objects/Maps, Python dicts, DNS caching, database query caches

### Page 12 — Trees & Binary Trees
- **Definition:** "A tree is a hierarchical data structure where each node has at most one parent and zero or more children — used wherever data has natural parent-child relationships."
- **Sections:** What is a Tree | Tree Terminology (root/leaf/height/depth) | Traversal (pre/in/post-order) | Complexity | Real World
- **Diagram 1:** Labelled tree (root, internal nodes, leaves, height annotation)
- **Diagram 2:** In-order traversal walk showing visited order
- **Real world:** DOM tree, file systems, org charts, HTML parsing

### Page 13 — Binary Search Trees
- **Definition:** "A BST is a binary tree where every left child is smaller than its parent and every right child is larger — enabling O(log n) search, insert, and delete on balanced trees."
- **Sections:** What is a BST | Insert & Search | Balanced vs Unbalanced | Complexity | Real World
- **Diagram 1:** BST with values, showing left < parent < right rule
- **Diagram 2:** Degenerate (skewed) tree vs balanced tree comparison
- **Real world:** Auto-complete sorted suggestions, ordered maps, range queries

### Page 14 — Heaps & Priority Queues
- **Definition:** "A heap is a complete binary tree satisfying the heap property — max-heap: parent ≥ children; min-heap: parent ≤ children. It powers the priority queue."
- **Sections:** What is a Heap | Heapify (insert & extract-max) | Heap as Array | Complexity | Real World
- **Diagram 1:** Max-heap tree with values
- **Diagram 2:** Same heap shown as array with index math annotations
- **Real world:** OS process scheduling, Dijkstra's algorithm, hospital triage systems, event queues

### Page 15 — Graphs
- **Definition:** "A graph is a set of nodes (vertices) connected by edges — the most general data structure, capable of modelling any relationship between entities."
- **Sections:** What is a Graph | Directed vs Undirected | Adjacency List vs Matrix | Complexity | Real World
- **Diagram 1:** Undirected graph (nodes + edges drawn by hand)
- **Diagram 2:** Adjacency list vs adjacency matrix side-by-side
- **Real world:** Social networks, Google Maps routing, recommendation engines, internet routing (BGP)

### Page 16 — BFS & DFS
- **Definition:** "BFS explores level by level using a queue; DFS dives as deep as possible using a stack — two fundamental strategies for visiting every node in a graph or tree."
- **Sections:** BFS (queue-based, level-order) | DFS (stack/recursion, depth-first) | When to use each | Complexity | Real World
- **Diagram 1:** BFS traversal order numbered on a graph
- **Diagram 2:** DFS traversal order + recursion call stack illustration
- **Real world:** BFS → social network degrees, shortest path in unweighted graph; DFS → topological sort, maze solving, cycle detection

### Page 17 — Sorting Algorithms
- **Definition:** "Sorting rearranges a collection into a defined order — the choice of algorithm determines whether this costs O(n log n) or O(n²), a difference that compounds massively at scale."
- **Sections:** Bubble/Selection/Insertion (O(n²)) | Merge Sort | Quick Sort | Comparison | Complexity | Real World
- **Diagram 1:** Merge sort split-and-merge visual
- **Diagram 2:** Quick sort partition around pivot visual
- **Real world:** Database ORDER BY, search result ranking, spreadsheet sorts, rendering z-index ordering

### Page 18 — Searching Algorithms
- **Definition:** "Searching finds a target value within a collection — linear search scans every element at O(n), while binary search halves the search space each step at O(log n)."
- **Sections:** Linear Search | Binary Search | Binary Search requirements | Complexity | Real World
- **Diagram 1:** Linear search — scanning left to right with highlight
- **Diagram 2:** Binary search — mid-point narrowing steps
- **Real world:** `Array.indexOf`, database index scans, spell-checkers, git bisect

### Page 19 — Recursion
- **Definition:** "Recursion is when a function calls itself with a simpler input, solving the original problem by combining solutions to smaller sub-problems — it always needs a base case to stop."
- **Sections:** What is Recursion | The Call Stack | Base Case vs Recursive Case | Recursion vs Iteration | Complexity | Real World
- **Diagram 1:** Call stack frames building up then unwinding (fibonacci example)
- **Diagram 2:** Recursive tree of calls for fib(5)
- **Real world:** File system traversal, DOM querying, JSON parsing, quicksort internals

### Page 20 — Dynamic Programming
- **Definition:** "Dynamic programming solves complex problems by breaking them into overlapping sub-problems, storing results to avoid recomputation — trading space for dramatic time savings."
- **Sections:** What is DP | Memoisation vs Tabulation | Classic example (fibonacci / knapsack) | Complexity | Real World
- **Diagram 1:** Fibonacci overlapping sub-problem tree (naive recursion, showing repeated calls)
- **Diagram 2:** DP table for fibonacci filled left-to-right
- **Real world:** Autocomplete word prediction, route optimisation (Google Maps), diff algorithms (git diff), spell-check suggestions

---

## Changes to Existing Files

### `index.html`
1. Add two new sidebar section labels: **Advanced Structures** and **Algorithms**
2. Add 10 new `sb-nav-item` entries (pages 11–20)
3. Update progress total from `1/10` → `1/20` in both `top-bar-progress` and `sb-progress-count`
4. Update title to reflect Part 1 + Part 2 (optional)

### `js/app.js`
- The dynamic loader uses `data-page` attributes — no JS changes needed if pages are named `page-11.html` through `page-20.html` and placed in `/pages/`

### `build.js`
- Already globs all pages automatically — no changes needed

---

## Build & Deploy Checklist
- [ ] Create `pages/page-11.html` through `pages/page-20.html`
- [ ] Update `index.html` sidebar + progress counter
- [ ] Run `node build.js` → verify `dist/index.html` output
- [ ] Test all 20 pages load correctly in browser
- [ ] Check tabs work, complexity table renders, rw-cards display
- [ ] Commit and push to GitHub

---

## Work Order
Build pages in chunks of 2–3 to keep context manageable:
- **Chunk A:** pages 11, 12, 13 (Hash Tables, Trees, BST)
- **Chunk B:** pages 14, 15 (Heaps, Graphs)
- **Chunk C:** pages 16, 17 (BFS/DFS, Sorting)
- **Chunk D:** pages 18, 19, 20 (Searching, Recursion, DP)
- **Final:** Update index.html sidebar, rebuild, test, push
