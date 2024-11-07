export default function Home(){
    return (
        <form>
            <h1>Course</h1>
            
                <div>
                    <input 
                        type="text"
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                        type="text"
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                        type="text"
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
        </form>
    )
}