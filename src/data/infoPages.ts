export interface InfoSection {
  id: string
  title: string
  paragraphs: string[]
  links?: { href: string; label: string }[]
}

export const companyInfo = {
  title: 'Aianduspoest',
  intro: 'Meie eesmärk on tuua kevadine värv ja rõõm iga aiani.',
  sections: [
    {
      id: 'kontakt',
      title: 'Kontakt',
      paragraphs: ['Kirjuta meile või astu läbi. Aitame leida sinu aeda sobivad taimed ja lillesibulad!'],
      links: [
        { href: 'mailto:info@aianduspood.ee', label: 'info@aianduspood.ee' },
        { href: 'tel:+37255555555', label: '+372 5555 5555' },
      ],
    },
    {
      id: 'meist',
      title: 'Meist',
      paragraphs: [
        'Aianduspood on loodud aednikele, kes hindavad kvaliteetseid taimi, häid nõuandeid ja lihtsat ostukogemust.',
        'Valime oma valikusse hooajale sobivad taimed, et sinu aed saaks kasvada ilusaks ja elujõuliseks.',
      ],
    },
    {
      id: 'tule-toole',
      title: 'Tule tööle!',
      paragraphs: ['Armastad taimi ja soovid aidata inimestel nende aedu kujundada? Saada meile oma CV!'],
      links: [{ href: 'mailto:tootajad@aianduspood.ee', label: 'tootajad@aianduspood.ee' }],
    },
  ] satisfies InfoSection[],
}

export const shopInfo = {
  title: 'E-poe info',
  intro: 'Kõik vajalik sinu ostukogemuse ja tellimuse kohta.',
  sections: [
    { id: 'muugitingimused', title: 'Müügitingimused', paragraphs: ['Tellimuse vormistamisel vali soovitud tooted ja lisa need ostukorvi. Tellimus loetakse kinnitatuks pärast ostu vormistamist.', 'Toodete hinnad on märgitud eurodes ja sisaldavad kehtivat käibemaksu.'] },
    { id: 'tarneviisid', title: 'Tarneviisid', paragraphs: ['Tellimusele saad valida sobiva tarneviisi vastavalt saadavusele ja sihtkohale.', 'Täpsemad tarneajad ja -kulud kuvatakse tellimuse vormistamisel.'] },
    { id: 'tagastus', title: 'Tagastus', paragraphs: ['Kui soovid toodet tagastada, võta meiega ühendust esimesel võimalusel aadressil info@aianduspood.ee.', 'Tagastatav toode peab olema kasutamata ja võimalusel originaalpakendis.'] },
    { id: 'garantiitingimused', title: 'Garantiitingimused', paragraphs: ['Kui tootel ilmneb puudus, anna sellest teada koos tellimuse numbri ja probleemi kirjeldusega.', 'Vaatame iga juhtumi läbi ja leiame sobiva lahenduse vastavalt kehtivatele tingimustele.'] },
  ] satisfies InfoSection[],
}
