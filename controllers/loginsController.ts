import {
getAllLogins,
getLoginById,
updateLogin,
deleteLogin
} from "../models/loginsModel"

import {createLogin} from "../models/insertQuerysModel"
import {getUserById} from "../models/usersModel"

export const loginsController = {

  allLoginsGet: (req: any, res: any) => {

      const logins = getAllLogins.all();
    
      for (const login of logins) {
    
        const user = getUserById.get(login.userId);
        login.user = user;
    
      }
    
      res.send(logins);
    
  },
    
  individualLoginGet: (req: any, res: any) => {
    
        const id = req.params.id;
        const login = getLoginById.get(id)
    
        if (login) {
    
          const user = getUserById.get(login.userId);
          login.user = user;
    
          res.send(login);
    
        }
    
        else {
          res.send({"error": "undefined"})
        }
    
  },
    
  loginPost: (req: any, res: any) => {
    
      // creating an museum is still the same as last week
      const { status, dateCreated, time, userId } = req.body
      const info = createLogin(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const logins = getLoginById.get(info.lastInsertRowid)
        res.send(logins)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualLoginDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteLogin.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'login not found.' })
      } 
      
      else {
        res.send({ message: 'login deleted.' })
      }
    
  },
    
  loginPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { status, dateCreated, time, userId } = req.body
    
      const info = updateLogin.run(status, dateCreated, time, userId)
      const updatedLogin = getLoginById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedLogin)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}