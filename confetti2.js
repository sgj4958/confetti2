const 폭죽 = (elementQuery, option) => {
    option = {
        message: "Confetti2",
        수량: 50,
        크기: [5, 15],
        x속도: [1, 4],
        y속도: [-5, -10],
        x위치: 30,
        y위치: 20,
        g: 0.1, // 중력가속도
        e: 0.001, // 반발계수
        u: 0.02, // 마찰계수
        ...option
    }

    const 랜덤 = (...값) => Math.random() * (Math.max(...값) - Math.min(...값)) + Math.min(...값)
    const parent = document.querySelector(elementQuery)
    parent.insertAdjacentHTML("beforeend", `
        <div id="confetti" style="position: relative;min-width: 100px;height: 40px;border: 1px solid #ddd;background: #fff;border-radius: 5px;">
            <button style="width: 100%;height: 100%;border: none;background: none;display: flex;justify-content: center;align-items: center;padding: 0 10px;cursor: pointer;gap: 10px;position: relative;z-index: 1;">
                <p style="transform-origin: 0 100%;">🎉</p>
                <p style="margin-right: 5px;">${option.message}</p>
            </button>
            <canvas style="width: 200%;position: absolute;bottom: 0;left: 0;"></canvas>
        </div>
    `)

    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    canvas.height = canvas.width

    const 폭죽 = (particles) => {
        parent.querySelector("button p:first-child").style.transform = "skew(7deg, 7deg)"
        setTimeout(() => parent.querySelector("button p:first-child").style.transform = "none", 100)

        let af

        const 발사 = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach((el, i, a) => {
                ctx.fillStyle = el.색상

                el.vx -= option.u
                el.x += el.vx

                el.vy += option.g
                el.y += el.vy

                if(el.y > canvas.height - el.크기) return a.splice(i, 1)
                else if(el.y < 0) {
                    el.y = 0
                    el.vy *= -option.e
                }

                ctx.save()
                ctx.translate(el.x, el.y)
                ctx.rotate(Math.PI * el.회전++ / 180)
                ctx.fillRect(-el.크기 / 2, -el.크기 / 2, el.크기, el.크기)
                ctx.restore()
            })

            af = requestAnimationFrame(발사)
            if(!particles.length) cancelAnimationFrame(af)
        }
        발사()
    }

    const 생성 = () => {
        폭죽(new Array(option.수량).fill().map(() => ({
                x: option.x위치 + 랜덤(-3, 3),
                y: canvas.height - option.y위치 + 랜덤(-1, 1),
                vx: 랜덤(...option.x속도),
                vy: 랜덤(...option.y속도),
                크기: 랜덤(...option.크기),
                색상: `hsl(${Math.round(Math.random() * 360)} 98% 82% / 1)`,
                회전: 랜덤(0, 360)
            })
        ))
    }

    parent.querySelector("#confetti button").addEventListener("click", 생성)
}
