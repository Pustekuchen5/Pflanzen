import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    plants: "plants",
    descriptions: "descriptions"
  };
  constructor(private sqlite: SQLite) { }
  async createDatabase() {
    await this.sqlite
      .create({
        name: "pflanzen",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database" + JSON.stringify(e));
      });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.plants} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE)`,
      []
    );

    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.descriptions} (id INTEGER PRIMARY KEY AUTOINCREMENT, plant_id INTEGER UNSIGNED NOT NULL, [name VARCHAR(255) NOT NULL]`,
      []
    )
  }

  async addPlant(name: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.plants} (name) VALUES (´${name}´)`,
        []
      )
      .then(() => {
        return "plant created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "plant already exists";
        }

        return "error on creating plant" + JSON.stringify(e);
      });
  }

  async getPlants() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.plants} ORDER BY name ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on creating plants" + JSON.stringify(e);
      });
  }

  async deletePlant(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM ${this.tables.plants} WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "plant deleted";
      })
      .catch((e) => {
        return "error on deleting plants" + JSON.stringify(e);
      });
  }

  async editPlant(name: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.plants} SET name = '${name}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "plant updated";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "plant already exist";
        }
        return "error on updating plants" + JSON.stringify(e);
      });
  }
}
