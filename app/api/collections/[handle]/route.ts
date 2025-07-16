import { NextResponse } from 'next/server'
import { GET as getAllCollections } from '../route'

export async function GET(_: Request, { params }: { params: { handle: string } }) {
  const allRes = await getAllCollections()
  const collections = await allRes.json()

  const parent = collections.find((col: any) => col.handle === params.handle)
  if (!parent) return NextResponse.json({ error: 'Collection not found' }, { status: 404 })

  const children = collections.filter((col: any) => col.parentId === parent.id)

  return NextResponse.json({ parent, children })
}
