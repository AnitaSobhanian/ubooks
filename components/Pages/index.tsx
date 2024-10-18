import Component, { PageEl } from '@/components/Libs/Component';
import Window from '@/components/Libs/Window';
import css from './css.module.css';
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "PIXEL"


  return (
    <div style={{ direction: "ltr",  minHeight: "11vh" }}>

      <br-x />

      {state.form == "bookspecs" ? <WindowFloat title='book informations' onclose={() => {
        delete state.form
        refresh()
      }}>

        <f-c>
          <f-15> Book Name:<sp-3 /></f-15>
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15> Author:</f-15>
          <sp-3 />
          <f-15>{state.book.author}</f-15>
        </f-c>


        <f-c>
          <f-15> Country:</f-15>
          <sp-3 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15> Year:</f-15>
          <sp-3 />
          <f-15>{state.book.year}</f-15>
        </f-c>

        <f-c>
          <f-15> Language:</f-15>
          <sp-3 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15> Pages:</f-15>
          <sp-3 />
          <f-15>{(state.book.pages as number)}</f-15>
        </f-c>

        <g-b onClick={() => {
          if (!state.faves) {
            state.faves = []
          }
          state.faves.push(state.book.title)
          state.form = null
        }}>
          <img src="https://cdn.ituring.ir/research/2/heart.png"
            style={{ height: 30, width: 30, objectFit: "contain" }} />
        </g-b>

      </WindowFloat> : null
      }

      <Window title={name} style={{ minHeight: 4200, margin: 10, width: "calc(100% - 33px)" }}>
        <c-c style={{ height: 500, width: "100%" }}>

          <br-x />
          <br-x />

          <w-cse style={{ padding: 5 }}>
            {props.books.map(book => {
              return <Block
                book={book}
                state={state}
                refresh={refresh}
              />
            })}
          </w-cse>
        </c-c>
      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }
  console.log(books)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}