import PouchDB from 'pouchdb'

type DataBaseConfigOption = PouchDB.AdapterWebSql.Configuration

class StoreDB {
  public dbName: string
  private db
  constructor(dbName: string, options?: DataBaseConfigOption) {
    this.dbName = dbName
    this.db = new PouchDB(this.dbName, options)
  }

  public async save(data: any) {
    return await this.db.put(data)
  }

  public async get(data: any) {
    return await this.db.get(data)
  }

  public async delete(data: any) {
    return await this.db.remove(data)
  }
}

export default StoreDB
