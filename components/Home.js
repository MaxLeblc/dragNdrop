import styles from '../styles/Home.module.scss';
import DND from '../components/DND';

function Home() {

  const data = [
    { title: 'toDo 1', items: ['manger une banane', 'boire de l\'eau', 'regarder un tuto'] },
    { title: 'toDo 2', items: ['nettoyer son écran', 'faire une sieste de 15min', 'regarder par la fenêtre'] },
    { title: 'toDo 3', items: ['changer RGB du clavier', 'aller aux toilettes'] }
  ]

  return (
    <>
      <main className={styles.main} >
        <DND data={data}/>
      </main>
    </>
  );
}

export default Home;
