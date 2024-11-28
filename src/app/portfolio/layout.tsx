import Nav from './components/Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='m-auto max-w-[1200px] pt-[32px]'>
      <Nav />
      <div>{children}</div>
    </div>
  )
}
