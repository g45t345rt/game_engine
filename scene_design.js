const scene = {
  childs: {
    mainCamera: {
      components: [
        Transform, {},
        Rect, { w: 500, h: 500 },
        Camera, { render: 'go:world' }
      ]
    },
    fps: {
      components: [
        Transform, {},
        DrawFPS, {}
      ]
    },
    world: {
      components: [
        Transform, {},
        Rect, { w: 500, h: 500 },
        Grid, {}
      ],
      childs: [
        {
          components: [
            Transform, {},
            Rect, { w: 50, h: 50 }
          ]
        }
      ]
    }
  }
}