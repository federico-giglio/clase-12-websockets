const fs = require("fs");

class Chat {
    constructor(fileName) {
        this.fileName = fileName
    }


async getAll() {
    //Array de objetos
    try {
        const data = await fs.promises.readFile(this.fileName, "utf-8")
        const array = await JSON.parse(data);
        return array;
    } catch (error) {
        return error;
    }
}

getNextId(items) {
    const ids = items.map(item => item.id);
    const nextId = Math.max(...ids) + 1;
    return nextId;
}

async save(object) {
    try {
        const array = await this.getAll();
        object.timestamp = new Date().toLocaleString();
        if (!array.length){
            object.id = 1;
            await fs.promises.writeFile(this.fileName, JSON.stringify([object]));
        } else {
            object.id = this.getNextId(array);
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify([object, ...array])
            );
        }
    console.log("Se ha agregado el item con ID: ", object.id);
} catch (error) {
    return error;
    }
}

async deleteAll() {
    try {
        await fs.promises.writeFile(this.fileName, "");
        console.log("Se han eliminado los productos.");
    } catch (error) {
        console.log(error);
    }
};
}

const chat = new Chat ('../chat.txt')

module.exports = chat;