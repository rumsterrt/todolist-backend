module.export.BadRequestError = class extends Error {
    constructor(message) {
        super(message)
        this.name = 'BadRequestError'
    }
}

module.export.DatabaseError = class extends Error {
    constructor(message) {
        super(message)
        this.name = 'DatabaseError'
    }
}
