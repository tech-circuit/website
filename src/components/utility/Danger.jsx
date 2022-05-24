import "../../styles/all.css";
// import "../../styles/createEvent.css";

const DangerBox = ({ name }) => {
    return (
        <>
            <div className="danger-zone-event">
                <h1>Danger zone</h1>
                <div className="danger-box-event">
                    <h2>Delete your {name}</h2>
                    <p className="dangerP">
                        This will permanently delete this {name} from
                        techCircuit.
                    </p>
                    <button id="delete-event">Delete</button>
                </div>
            </div>
        </>
    );
};

export default DangerBox;
