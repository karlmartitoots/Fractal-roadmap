from playwright.sync_api import sync_playwright

def verify_app(page):
    # 1. Load the app
    page.goto("http://localhost:5173/Fractal-roadmap/")
    page.wait_for_selector("h1")

    # Screenshot 1: Initial State
    page.screenshot(path="verification/1_initial.png")

    # 2. Zoom In on "Project A"
    # Wait for the element to be stable
    page.click("text=Project A")

    # Wait for animation (Zoom In)
    # The header should change to "Project A"
    page.wait_for_selector("h1:has-text('Project A')")
    # Wait a bit more for stagger animation to finish
    page.wait_for_timeout(1000)

    # Screenshot 2: Zoomed In
    page.screenshot(path="verification/2_zoomed_in.png")

    # 3. Zoom Out
    page.click("button:has-text('Zoom Out')")

    # Wait for animation (Zoom Out)
    page.wait_for_selector("h1:has-text('Home')")
    page.wait_for_timeout(1000)

    # Screenshot 3: Zoomed Out
    page.screenshot(path="verification/3_zoomed_out.png")

    # 4. Magic Button on Subtask
    # Click "Project A" to go back in
    page.click("text=Project A")
    page.wait_for_selector("h1:has-text('Project A')")

    # Find the magic button on "Task A1" (first item usually)
    # We need to find the magic button associated with a list item, not the main header
    # Let's assume Task A1 exists or we use the first li
    first_li_magic_btn = page.locator("li button[aria-label='Auto-generate subtasks']").first
    first_li_magic_btn.click()

    # This should trigger navigation to that task
    # We don't know the exact title (Task A1?), let's wait for change
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/4_magic_navigated.png")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
