
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity:0, y:40 },
  visible: { opacity:1, y:0 }
}

export default function Page() {
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')

  async function send() {
    const res = await fetch('/api/diesel-ai', {
      method:'POST',
      body:JSON.stringify({ message: input })
    })
    const data = await res.json()
    setReply(data.reply)
  }

  return (
    <main>
      <section className="hero">
        <img src="/girl.png" />
        <div className="overlay" />
        <motion.div
          initial={{ opacity:0, y:80 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }}
          style={{ position:'absolute', bottom:'12%', left:'6%' }}
        >
          <h1 style={{ fontSize:'clamp(4rem,8vw,7rem)', lineHeight:0.95 }}>
            SPILL THE <span className="red">REAL</span>
          </h1>
        </motion.div>
      </section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
        <h2 className="red">MANIFESTO</h2>
        <p style={{ fontSize:'1.6rem', maxWidth:'720px' }}>
          Diesel doesn’t chase perfection. We celebrate the spill,
          the noise, the moments you didn’t plan.
        </p>
      </motion.section>

      <section>
        <h2>LOOKBOOK</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible:{ transition:{ staggerChildren:0.15 }}}}
          style={{ display:'flex', gap:'4rem', overflowX:'auto' }}
        >
          {[1,2,3,4].map(i => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale:1.05 }}
              style={{ minWidth:'320px', height:'420px', background:'#111' }}
            />
          ))}
        </motion.div>
      </section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
        <h2 className="red">TALK TO DIESEL</h2>
        <input
          placeholder="Say something real"
          onChange={e => setInput(e.target.value)}
          style={{
            fontSize:'2rem',
            background:'black',
            color:'white',
            border:'none',
            borderBottom:'2px solid #333',
            width:'100%',
            padding:'1rem 0'
          }}
        />
        <button
          onClick={send}
          style={{
            marginTop:'2rem',
            background:'none',
            color:'white',
            border:'1px solid #333',
            padding:'0.8rem 2rem',
            cursor:'pointer'
          }}
        >
          SPILL IT
        </button>

        {reply && (
          <motion.p
            key={reply}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            style={{ fontSize:'2rem', marginTop:'2rem' }}
          >
            {reply}
          </motion.p>
        )}
      </motion.section>

      <footer>
        NOT PERFECT. NEVER WAS.<br/>
        © DIESEL
      </footer>
    </main>
  )
}
