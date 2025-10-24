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

 function knightMoves (s, d, q = [new Node(s)], found = [new Node(s)]) {
    
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

    //checking children node 
    q[0].edgeList.forEach((edge) => {
        //o(n)
        const foundNode = found.some(f => edge[0] === f.data[0] && edge[1] === f.data[1]) 

        if (!foundNode) {
            let e = new Node(edge, q[0]); 
            found.push(e)
            q.push(e)
        }
    })
    console.log(q)
    q.shift()
    
    return knightMoves(s, d, q, found)
}
knightMoves([0,0], [7,7])