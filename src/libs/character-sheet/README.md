character-sheet
===

**Preface**: I hate the name, but can't think of a better one.
Suggestions are welcome.

This module is the meat and bones of the project. It's how
we structure loading what's we call "systems" and "renderers"
and what defines the very basic structure of a "character sheet".

## Systems

Systems represent RPG systems, like D&D 5e, Pathfinder, etc. They
hold various facets of this system like attributes, skills, etc.
Even things like the formula to determine an ability modifier in
D&D 5e would be within the system. We want as much logic in these
guys as possible since they are the shared component between the
sheet and the renderer.

## Renderers

Renderers determine how a character sheet is displayed (or not).
They are decoupled since how a sheet is displayed on a web page
will be very different from a terminal or a PDF (not that this
project is interested in these other formats, but you know...
this is just me playing around and over-engineering stuff for
the fun of it).

## Character Sheet

Essentially just a record of statistics and values for a
character. As dumb a JS object as it can be, then the system and
the renderer do their magic.
