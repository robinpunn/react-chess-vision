# Refactor Log
## 12/25/25
`App.tsx` is doing too much 
- Extracted getRandom square, added tests

## 02/04/26
`Chessboard.tsx` is doing too much.
- Extracted square information, added tests
- Extracted color assignment, added tests

## 02/05/26
Cleaning up `Chessboard.tsx`
- Added Perspective type
- Pass perspective to square info to render id, added tests

## 02/06/26
Cleaning up `Chessboard.tsx`
- Added showCoordinates boolean to ChessBoardProps (potential hard mode)
- Created boolean variables to use in  <td> cell rendering

## 02/07/26
Added `usePerspective` hook
- will allow the player to choose light or dark perspective
- to be used by the button the player interacts with to change perspective
Removed `[board, setBoard]` which was doing nothing...
