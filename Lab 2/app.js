/* comands in terminal
* node app - start server
* */

const express = require('express');
const pug = require('pug');
const path = require('path');
//connect the modules


const app = express();//express as function, after that we can start server


app.use(express.json());//json - javascript object notation, dynamic data type
app.use(express.urlencoded());//encode the data

app.set('view engine', 'pug');//app works with pug files
app.set('views', path.join(__dirname, 'static', 'views', 'pages'));//location of static files


class Ship {
    constructor(name, number, country, weight) {
        this.name = name;
        this.number = number;
        this.country = country;
        this.weight = weight
    }
}

class Port {
    constructor(code, name, country, adress) {
        this.name = name;
        this.code = code;
        this.country = country;
        this.adress = adress
    }
}


class Pier {
    constructor(port, number, capacity) {
        this.port = port;
        this.number = number;
        this.capacity = capacity;
    }
    ships = [];
}

let accountant = (piers) => {
    let mas = [];
    piers.forEach(value => {
        let obj = {
            piers: value.number,
            goodsInStorage: value.goodsInStorage.length,
            ports: {},
            allGoods: value.capacity
        };

        value.goodsInStorage.forEach(ports => {
            obj.ports[ports.code] = obj.ports[ports.code] + 1 || 1;
        });

        mas.push(obj)
    });

    return mas
};


let ships = [new Ship('Корабель1', 123, 'Укр', 1100), new Ship('Корабель2', 124, 'Укр', 1200),
    new Ship('Корабель3', 125, 'Рус', 1400)];

let ports = [new Port(123, 'Порт1', "usa", "адреса"), new Port(987, 'Порт2', 'Ukraine', "адреса2"),
    new Port(654, 'Порт3', 'OAE', "адреса3")];

let piers = [new Pier(ports[0], 123, 3),
    new Pier(ports[1], 124, 2),
    new Pier(ports[2], 125, 6)];

//console.log(accountant(piers));

app.get('/', (req, res) => {//render index (home page)
    res.render('index')
});

app.get('/ship', (req, res) => {//render /shop
    res.render('ship', {ships: ships})
});

app.post('/addShip', (req, res) => {//with this we can create data
    let info = req.body;

     let check = ships.filter(value => {
        return value.number === +info.number
    });

     if (check.length === 0) {
        ships.push(new Ship(info.name, info. number, info.country, info.weight));
        res.render('ship', {info: 'Корабель успішно додано',ships: ships})
    } else {
        res.render('ship', {info: 'Перевірте номер! Корабель з таким кодом уже існує',ships: ships})
    }
});

app.post('/editShip', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    ships[index] = new Ship(info.name,ships[index].number, info.country, info.weight);

    res.render('ship', {ships: ships})
});

app.post('/deleteShip', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    ships.splice(index, 1)

    res.render('ship', {ships: ships, info: 'Корабель видаленно!'})
});

app.post('/findShip', (req, res) => {
    let info = req.body;

    let meet = ships.filter(value => {
        return value.name === info.name
    });

    if (meet.length === 0) {
        res.render('ship', {ships: ships, find: 'Корабель не знайдено!'})
    } else {
        res.render('ship', {ships: ships, find: `Корабель ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/port', (req, res) => {
    res.render('port', {ports: ports})
});

app.post('/addPorts', (req, res) => {
    let info = req.body;

    let check = ports.filter(value => {
        return value.code === +info.code
    });

    if (check.length === 0) {
        ports.push(new Port(+info.code, info.name, info.country, info.adress))
        res.render('port', {info: 'Порт успішно додано',ports: ports})
    } else {
        res.render('port', {info: 'Перевірте код! Порт з таким кодом уже існує',ports: ports})
    }
});

app.post('/editPorts', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    ports[index] = new Port(ports[index].code, info.name, info.country, info.adress);
    res.render('port', {ports: ports})
});

app.post('/deletePorts', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    ports.splice(index, 1);

    res.render('port', {ports: ports, info: 'Порт видаленно!'})
});

app.post('/findPorts', (req, res) => {
    let info = req.body;

    let meet = ports.filter(value => {
        return value.code === +info.code
    });

    if (meet.length === 0) {
        res.render('port', {ports: ports, find: 'Порт не знайдено!'})
    } else {
        res.render('port', {ports: ports, find: `Порт ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/pier', (req, res) => {
    res.render('pier', {piers: piers, ports: ports})
});

app.post('/addPier', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    let check = piers.filter(value => {
        return value.number === +info.number
    });

    if (check.length === 0) {
        piers.push(new Pier(+info.number, ships[index], +info.capacity, []));
        res.render('pier', {info: 'Склад успішно додано', piers: piers, ports: ports})
    } else {
        res.render('pier', {
            info: 'Перевірте номер! Склад з таким номером уже існує',
            piers: piers,
            ports: ports
        })
    }
});

app.post('/editPier', (req, res) => {
    let info = req.body;
    let index = info.index[0];
    let indexShop = info.indexShop[0];

    piers[index] = new Pier(piers[index].number, ships[indexShop], info.capacity, []);
    res.render('pier', {piers: piers, ports: ports, edit: 'Склад проредаговано'})
});

app.post('/deletePier', (req, res) => {
    let info = req.body;
    let index = info.index[0];

    piers.splice(index, 1);

    res.render('pier', {piers: piers, ports: ports, delets: 'Склад видалено'})
});

app.post('/findPier', (req, res) => {
    let info = req.body;

    let meet = piers.filter(value => {
        return value.number === +info.number
    });

    if (meet.length === 0) {
        res.render('pier', {piers: piers, ports: ports, find: 'Склад видалено'})
    } else {
        res.render('pier', {piers: piers, ports: ports, find: `Склад ${JSON.stringify(meet[0])} знайдено!`})
    }
});

app.get('/Actions', (req, res) => {

    res.render('Actions', {ships: ships, piers: piers})
});

app.post('/addShipToPier', (req, res) => {
    let info = req.body;
    let indexShip = info.indexShip[0];
    let indexPier = info.indexPier[0];

    piers[indexPier].ships.push(ships[indexShip]);
        res.render('Actions', {
            ships: ships, piers: piers,
            info: `Корабель ${ships[indexShip].name} додано до пристані N ${piers[indexPier].number}`
        })
    

});

app.post('/deleteShipFromPier', (req, res) => {
    let info = req.body;
    let indexShip = info.indexShipp[0];
    let indexPier = info.indexPierr[0];
    let checker = 0;

    piers[indexPier].ships.forEach((value, index) => {
        if (value.number === ships[indexShip].number && checker === 0) {
            piers[indexPier].ships.splice(index, 1);
            checker++;
            res.render('Actions', {ships:ships, piers: piers,info1: "Корабель видалено"})
        }
        else{
            res.render('Actions', {ships:ships, piers: piers,info1: "Помилка"})
        }
         console.log(value);
    });

});

app.get('/report', (req, res) => {
    res.render('report', {piers: piers, ports:ports})
});

// let storageChecker = (piers) => {
//     let inStorage = accountant(piers);
//     let end = [];

//     inStorage.forEach((value, index) => {
//         let conclusion = (value.goodsInStorage / value.allGoods) * 100;
//         if (conclusion < 20) end.push(piers[index])
//     });

//     return end
// };

// app.post('/report', (req, res) => {
//     console.log(storageChecker(piers));
//     res.render('report', {acc: acpiers), data: storageChecker(piers)})
// });

app.get('/goodsToShop', (req, res) => {
    console.log(storageRouter(piers, ships));
    res.render('goodsToShop', {data: storageRouter(piers, ships)})
});

let storageRouter = (piers, ships) => {
    let mas = [];
    ships.forEach(value => {
        let obj = {
            shop: value,
            piers: [],
            allGoods: []
        };

        let ok = piers.filter(stor => {
            return stor.magazine.name === value.name
        });

        ok.forEach((need, index) => {
            obj.piers.push(need);
            obj.allGoods.push(need.goodsInStorage)
        });

        let end = obj.allGoods.flat(2);
        obj.allGoods = end;

        mas.push(obj)

    });
    return mas
};
// req.params.id
app.get('/ships/:id', function (req, res, next) {
    res.render('info', {
        data: storageRouter(piers, ships)[req.params.id],
        shopka: ships[req.params.id],
        fix: req.params.id
    });
});

app.post('/ships/:id', (req, res) => {
    let body = req.body;

    let firstIndex = body.indexSt[0];
    let secondIndex = body.indexGoods[0];

    let shop = storageRouter(piers, ships)[req.params.id];

    shop.piers[firstIndex].goodsInStorage.forEach((value, index, arr) => {
        if (value.code === shop.allGoods[secondIndex].code) {

            ships[req.params.id].goodsInShop.push(arr.splice(index, 1));
            ships[req.params.id].goodsInShop = ships[req.params.id].goodsInShop.flat(2)
            console.log(ships[req.params.id].goodsInShop);
            res.render('info', {
                data: storageRouter(piers, ships)[req.params.id],
                shopka: ships[req.params.id],
                fix: req.params.id
            })
        } else res.render('info', {
            data: storageRouter(piers, ships)[req.params.id],
            shopka: ships[req.params.id],
            fix: req.params.id
        })
    })
    res.render('info', {
        data: storageRouter(piers, ships)[req.params.id],
        shopka: ships[req.params.id],
        fix: req.params.id
    })
});

app.get('/ships/:id/transfer', function (req, res, next) {
    res.render('transfer', {
        data: storageRouter(piers, ships)[req.params.id],
        shopka: ships[req.params.id],
        fix: req.params.id
    });
});

app.post('/ships/:id/transfer', ((req, res) => {
    let body = req.body;

    let from = body.indexOne[0];
    let to = body.indexTwo[0];
    let good = body.indexGoods[0];

    let shop = storageRouter(piers, ships)[req.params.id];

    shop.piers[from].goodsInStorage.forEach((value, index, arr) => {
        if (value.code === shop.allGoods[good].code) {

            shop.piers[to].goodsInStorage.push(arr.splice(index, 1));
            shop.piers[to].goodsInStorage = shop.piers[to].goodsInStorage.flat(2);
            res.render('transfer', {
                data: storageRouter(piers, ships)[req.params.id],
                shopka: ships[req.params.id],
                fix: req.params.id
            });
        } else res.render('transfer', {
            info: 'Помилка! Перевірте наявність товару',
            data: storageRouter(piers, ships)[req.params.id], shopka: ships[req.params.id], fix: req.params.id
        });
    });


}));

app.get('/allShips', (req, res)=>{
    res.render('collection/allShips', {data: ships})
});

app.get('/allPorts', (req, res)=>{
    res.render('collection/allPorts', {data: ports})
});

app.get('/allPiers', (req, res)=>{
    res.render('collection/allPiers', {acc: piers})
});

app.listen(3000, () => {//function of server
    console.log(3000)
});