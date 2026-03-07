# Refactor Log
## 03/07/26
Added `useClassicMode` hook
- game mode hook for original version of the game
- added tests
- replaced logic in `App.tsx`

## 03/06/26
Create `useSquareVisual` hook
- handles the visibility/fade out of current square
- added tests

## 03/05/26
Added tests for `useTimer` hook
- added `formatTime` utils for ui
- implemented `useTimer` hook in `App.tsx`
- will be moved when game mode hook is created

## 03/04/26
Added `useTimer` hook
- removed logic from App.tsx
- timer can be used as countdown, ongoing, precountdown, or time for selectoin

## 03/03/26
Added `useGameScore` hook
- removed logic from `App.tsx`
- added tests
- leaves basic game scoring unchanged and allows for easy scoring manipulation in potential new modes

## 03/02/26
Added `useWindowSize` hook
- replaced the logic that initally existed in `App.tsx` into its own file
- added tests

## 02/07/26
Added `usePerspective` hook
- will allow the player to choose light or dark perspective
- to be used by the button the player interacts with to change perspective
Removed `[board, setBoard]` which was doing nothing...

## 02/06/26
Cleaning up `Chessboard.tsx`
- Added showCoordinates boolean to ChessBoardProps (potential hard mode)
- Created boolean variables to use in  <td> cell rendering

## 02/05/26
Cleaning up `Chessboard.tsx`
- Added Perspective type
- Pass perspective to square info to render id, added tests

## 02/04/26
`Chessboard.tsx` is doing too much.
- Extracted square information, added tests
- Extracted color assignment, added tests

## 12/25/25
`App.tsx` is doing too much 
- Extracted getRandom square, added tests
