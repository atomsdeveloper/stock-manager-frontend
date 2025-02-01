const Dashboard = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-200">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 bg-slate-300">
                <div className="aspect-video rounded-xl bg-muted/50 bg-slate-400" />
                <div className="aspect-video rounded-xl bg-muted/50 bg-slate-500" />
                <div className="aspect-video rounded-xl bg-muted/50 bg-slate-600" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-slate bg-slate-700" />
        </div>
    )
}

export default Dashboard;