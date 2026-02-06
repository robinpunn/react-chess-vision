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

