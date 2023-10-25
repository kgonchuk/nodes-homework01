const fs = require('fs/promises')
const path = require('path')
const  nanoId=require('nanoid')

 const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts =  async()=> {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }
  
  const getContactById= async(contactId)=> {
    const contacts= await listContacts()
    const result = contacts.find(item=>item.id===contactId)
    return result || null
  }
  
  const removeContact=async(contactId)=> {
    const contact=await listContacts();
    const index= contact.findIndex(item=>item.id===contactId)
    if(index===-1){
      return null
    }
    const [results]=contact.splice(index, 1)
    await  fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return results
  }
  
  const addContact=async({name, email, phone}) =>{
    const  contacts= await listContacts()
    const newContact={
      id:nanoId,
      name, email, phone 
    }
    contacts.push(newContact)
    await  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
  }
  module.exports={
    listContacts,
    getContactById,
    addContact,
    removeContact
  }