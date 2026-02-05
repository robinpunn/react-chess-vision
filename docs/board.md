# Board Logic

8×8 grid using zero-based indices:

- `rowIndex`: 0 (top) → 7 (bottom)
- `colIndex`: 0 (left) → 7 (right)

## Square Identity

`squareInfo(rowIndex, colIndex, perspective)` takes perspective into consideration to return the correct square id\n
returns:
- `file` (`a`–`h`)
- `rank` (`1`–`8`)
- `id` (e.g. `e4`)


## Square Color

`squareColor(rowIndex, colIndex)` returns:

- `"light"` or `"dark"`


## Random Square Selection

`getRandomSquare()` returns:
- a valid square id (`a1`–`h8`)
- used by gameplay logic to let player know the target square

