class Node {
    constructor (data, prev = null, dist = 0) {
        
        this.data = data;
        this.prev = prev;
        this.dist = dist;
        this.edgeList = knightPosMoves(data);
    }
}

function knightPosMoves ([x,y]) {
    let moves = []
    let arr = [[1,2],[-1,2],
               [2,1],[2,-1],
               [1,-2],[-1,-2],
               [-2,1],[-2,-1]]
    arr.forEach(([a,b]) => {
        if (0 <= x+a && x+a <= 7 && 0 <= y+b && y+b <= 7) moves.push([x+a, y+b])
    })
    return moves
}

export function knightMoves (s, d, q = [new Node(s)], found = new Set()) {

    if (q.length == 0) {
        console.log("no path found! try another destination")
        return 
    }
    if (q[0].data[0] == d[0] && q[0].data[1] == d[1]){ 
        let par = q[0];
        let key = "Here's your path: ";
        let path = [];
        while (par) {
            path.unshift(par.data)
            par = par.prev
        }    
        path.forEach(p => key = `${key} [${p}]`)
        console.log(`You made it in ${path.length - 1} moves`,'\n',key)
        return
    }

    if (found.size == 0) found.add(`${s[0]},${s[1]}`)
    //checking children node 
    q[0].edgeList.forEach((edge) => {
        //store the found set as data keys  instead of the nodes 
        if (!found.has(`${edge}`)) {
            found.add(`${edge}`)
            q.push(new Node(edge, q[0]))
        }
    })

    q.shift()
    return knightMoves(s, d, q, found)
}
// knightMoves([0,0], [7,7])
