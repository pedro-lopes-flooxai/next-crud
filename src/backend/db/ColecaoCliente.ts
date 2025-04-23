import { db } from "../config";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  setDoc,
  addDoc,
  getDoc,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

  #conversor: FirestoreDataConverter<Cliente> = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    },
  };

  private colecao() {
    return collection(db, "clientes").withConverter(this.#conversor);
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await setDoc(doc(this.colecao(), cliente.id), cliente);
      return cliente;
    } else {
      const docRef = await addDoc(this.colecao(), cliente);
      const docSnap = await getDoc(docRef);
      return docSnap.data()!;
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    return await deleteDoc(doc(this.colecao(), cliente.id));
  }

  async obterTodos(): Promise<Cliente[]> {
    const querySnapshot = await getDocs(this.colecao());
    return querySnapshot.docs.map(doc => doc.data()) ?? [];
  }
}
