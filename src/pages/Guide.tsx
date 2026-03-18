export default function Guide() {
  return (
    <section className="section">
      <div className="reveal in-view">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight heading-gradient">Mettre le portfolio en ligne (GitHub Pages)</h2>

        <div className="mt-4 space-y-4 text-gray-700">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
            <p>🔆 <strong>L’ensemble de cette présentation doit être en ligne dans votre portfolio</strong></p>
          </div>

          <p>Vous pouvez choisir une solution gratuite comme GitHub Pages.</p>

          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3">
            <p>🙋‍♂️ Prérequis: avoir installé GIT sur votre ordinateur.</p>
            <p className="mt-1">Un étudiant de l’ORT a fait un tuto: merci à <em>Yonathan Cardoso</em> →{' '}
              <a className="underline text-indigo-600" href="https://www.phenixel.fr/" target="_blank" rel="noreferrer">https://www.phenixel.fr/</a>
            </p>
            <p className="mt-1">
              Vidéo: <a className="underline text-indigo-600" href="https://youtu.be/ttxVnxn5YOQ" target="_blank" rel="noreferrer">
                GitHub pour les DÉBUTANTS ! Apprendre les bases
              </a>
            </p>
          </div>

          <p>
            GitHub Pages: <a className="underline text-indigo-600" href="https://pages.github.com/" target="_blank" rel="noreferrer">https://pages.github.com/</a>
          </p>
          <p>
            Documentation: <a className="underline text-indigo-600" href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site" target="_blank" rel="noreferrer">
              Creating a GitHub Pages site - GitHub Docs
            </a>
          </p>

          <h3 className="text-lg font-semibold mt-4">1) Activation de GitHub Pages</h3>
          <p>Créer un dépôt nommé <code className="px-1 py-0.5 bg-gray-100 rounded">username.github.io</code> (remplacer <em>username</em> par votre compte).</p>
          <ul className="list-disc pl-5">
            <li>Sur GitHub → New → Repository name: <em>username.github.io</em></li>
            <li>Rendre public et créer.</li>
            <li>Activer Pages dans Settings → Pages (si nécessaire).</li>
          </ul>
        </div>
      </div>
    </section>
  )
}




